export type GetAllCustomers = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
};

export type GetAllCustomersResponse = {
  data: GetAllCustomers[];
  nextCursor: string | null;
  total: number;
};
