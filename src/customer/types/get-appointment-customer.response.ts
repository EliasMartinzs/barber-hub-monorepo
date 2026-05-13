import { AppointmentStatus } from 'src/generated/prisma';

export type GetCustomerAppointmentsResponse = {
  data: {
    id: string;

    startAt: Date;
    endAt: Date;

    status: AppointmentStatus;

    totalPrice: number;

    notes: string | null;

    createdAt: Date;

    barber: {
      id: string;

      name: string;

      image: string | null;
    };

    services: {
      id: string;

      name: string;

      price: number;

      durationInMinutes: number;
    }[];
  }[];

  nextCursor: string | null;
};
