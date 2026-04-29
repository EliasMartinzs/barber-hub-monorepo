import { Prisma } from 'src/generated/prisma';

export type ServiceResponse = Prisma.ServiceGetPayload<{
  select: {
    id: true;
    tenantId: true;
    name: true;
    description: true;
    price: true;
    durationInMinutes: true;
    isActive: true;
    imageUrl: true;
    order: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
