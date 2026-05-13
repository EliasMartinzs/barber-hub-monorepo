import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetAllCustomersQueryDto } from 'src/customer/dto/get-all-customers-query.dto';
import { GetCustomerAppointmentsQueryDto } from 'src/customer/dto/get-appointmente-customer.deto';
import { GetAllCustomersResponse } from 'src/customer/types/get-all-customers.response';
import { handleError } from 'src/errors/handle-error';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(
    tenantId: string,
    query: GetAllCustomersQueryDto,
  ): Promise<GetAllCustomersResponse> {
    const { cursor, limit = 20, search } = query;
    try {
      const [customers, total] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          take: limit,
          ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
          where: {
            memberships: { some: { tenantId, role: 'CLIENT' } },
            ...(search
              ? {
                  OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                  ],
                }
              : {}),
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.user.count({
          where: { memberships: { some: { tenantId, role: 'CLIENT' } } },
        }),
      ]);
      return {
        data: customers,
        nextCursor: customers.at(-1)?.id ?? null,
        total,
      };
    } catch (e) {
      handleError(e);
    }
  }

  async getById(id: string, tenantId: string) {
    try {
      if (!id) {
        throw new NotFoundException('Usuario nao encontrado');
      }
      const data = await this.prisma.membership.findUnique({
        where: {
          id,
          tenantId,
        },
        include: {
          user: true,
        },
      });

      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async getProfile(id: string, tenantId: string) {
    try {
      if (!id) {
        throw new NotFoundException('Usuario nao encontrado');
      }
      const membership = await this.prisma.membership.findFirst({
        where: { tenantId, role: 'CLIENT', userId: id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              phone: true,
              createdAt: true,
            },
          },
          appointmentsAsCustomer: {
            include: {
              barber: { include: { user: { select: { name: true } } } },
              services: {
                include: { service: { select: { id: true, name: true } } },
              },
            },
            orderBy: { startAt: 'desc' },
          },
        },
      });
      if (!membership) {
        throw new NotFoundException('Membro nao encontrado');
      }
      const appointments = membership.appointmentsAsCustomer;
      const completedAppointments = appointments.filter(
        (appointment) => appointment.status === 'COMPLETED',
      );
      const canceledAppointments = appointments.filter(
        (appointment) => appointment.status === 'CANCELED',
      );
      const noShowAppointments = appointments.filter(
        (appointment) => appointment.status === 'NO_SHOW',
      );
      const totalSpent = completedAppointments.reduce(
        (acc, appointment) => acc + Number(appointment.totalPrice),
        0,
      );
      const attendanceRate =
        appointments.length > 0
          ? Math.round(
              (completedAppointments.length / appointments.length) * 100,
            )
          : 0;
      const serviceMap = new Map<
        string,
        { id: string; name: string; count: number }
      >();
      for (const appointment of completedAppointments) {
        for (const appointmentService of appointment.services) {
          const service = appointmentService.service;
          const existing = serviceMap.get(service.id);
          if (existing) {
            existing.count += 1;
          } else {
            serviceMap.set(service.id, {
              id: service.id,
              name: service.name,
              count: 1,
            });
          }
        }
      }
      const favoriteServices = [...serviceMap.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((service) => ({
          ...service,
          percentage:
            completedAppointments.length > 0
              ? Math.round((service.count / completedAppointments.length) * 100)
              : 0,
        }));
      const barberMap = new Map<string, number>();
      for (const appointment of completedAppointments) {
        barberMap.set(
          appointment.barber.user.name,
          (barberMap.get(appointment.barber.user.name) ?? 0) + 1,
        );
      }
      const favoriteBarber =
        [...barberMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      const lastAppointment = completedAppointments
        .sort(
          (a, b) =>
            new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
        )
        .at(0);
      const nextAppointment = appointments
        .filter(
          (appointment) =>
            appointment.status === 'SCHEDULED' &&
            new Date(appointment.startAt) > new Date(),
        )
        .sort(
          (a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        )
        .at(0);
      const monthsAsCustomer = Math.floor(
        (Date.now() - new Date(membership.createdAt).getTime()) /
          (1000 * 60 * 60 * 24 * 30),
      );

      return {
        client: {
          id: membership.user.id,
          name: membership.user.name,
          email: membership.user.email,
          image: membership.user.image,
          phone: membership.user.phone,
          createdAt: membership.user.createdAt,
        },
        stats: {
          totalAppointments: appointments.length,
          completedAppointments: completedAppointments.length,
          canceledAppointments: canceledAppointments.length,
          noShowCount: noShowAppointments.length,
          totalSpent,
          attendanceRate,
          monthsAsCustomer,
          favoriteBarber,
          lastAppointment: lastAppointment?.startAt ?? null,
          nextAppointment: nextAppointment?.startAt ?? null,
        },
        favoriteServices,
        upcomingAppointment: nextAppointment
          ? {
              id: nextAppointment.id,
              date: nextAppointment.startAt,
              services: nextAppointment.services.map((service) => ({
                id: service.service.id,
                name: service.service.name,
              })),
              barber: nextAppointment.barber.user.name,
              status: nextAppointment.status,
            }
          : null,
      };
    } catch (e) {
      handleError(e);
    }
  }

  async getAppointments(
    id: string,
    tenantId: string,
    query: GetCustomerAppointmentsQueryDto,
  ) {
    const { cursor, limit = 10, status } = query;

    const appointments = await this.prisma.appointment.findMany({
      take: limit,

      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),

      where: {
        tenantId,
        customer: {
          userId: id,
        },

        ...(status
          ? {
              status: status as any,
            }
          : {}),
      },

      include: {
        barber: {
          include: {
            user: true,
          },
        },

        services: {
          include: {
            service: true,
          },
        },
      },

      orderBy: {
        startAt: 'desc',
      },
    });

    return {
      data: appointments.map((appointment) => ({
        id: appointment.id,

        startAt: appointment.startAt,
        endAt: appointment.endAt,

        status: appointment.status,

        totalPrice: appointment.totalPrice,

        notes: appointment.notes,

        createdAt: appointment.createdAt,

        barber: {
          id: appointment.barber.user.id,

          name: appointment.barber.user.name,

          image: appointment.barber.user.image,
        },

        services: appointment.services.map((appointmentService) => ({
          id: appointmentService.service.id,

          name: appointmentService.service.name,

          price: appointmentService.service.price,

          durationInMinutes: appointmentService.service.durationInMinutes,
        })),
      })),

      nextCursor: appointments.at(-1)?.id ?? null,
    };
  }
}
