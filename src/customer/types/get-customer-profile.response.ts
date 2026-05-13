import { AppointmentStatus } from 'src/generated/prisma';

export type CustomerProfileResponse = {
  client: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    phone: string | null;
    createdAt: Date;
  };

  stats: {
    totalAppointments: number;
    completedAppointments: number;
    canceledAppointments: number;
    noShowCount: number;

    totalSpent: number;

    attendanceRate: number;

    monthsAsCustomer: number;

    favoriteBarber: string | null;

    lastAppointment: Date | null;

    nextAppointment: Date | null;
  };

  favoriteServices: {
    id: string;
    name: string;
    count: number;
    percentage: number;
  }[];

  upcomingAppointment: {
    id: string;

    date: Date;

    services: {
      id: string;
      name: string;
    }[];

    barber: string;

    status: AppointmentStatus;
  } | null;
};
