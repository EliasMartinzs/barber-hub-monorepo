import { $Enums } from 'src/generated/prisma/client';

export type CustomerById = {
  user: {
    email: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
  };
} & {
  id: string;
  createdAt: Date;
  userId: string;
  tenantId: string;
  role: $Enums.MembershipRole;
};
