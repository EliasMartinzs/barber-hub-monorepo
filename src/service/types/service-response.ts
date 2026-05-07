import { Prisma } from 'src/generated/prisma';

export type ServiceResponse = Prisma.ServiceGetPayload<{
  select: {
    id: true;
    tenantId: true;
    description: true;
    name: true;
    price: true;
    durationInMinutes: true;
    isActive: true;
    imageUrl: true;
    order: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export interface GetServicesResponse {
  data: ServiceResponse[];
}
