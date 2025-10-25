export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Product = {
  id: string;
  name: string;
  priceCents: number;
};

export type Order = {
  id: string;
  userId: string;
  productIds: string[];
  totalCents: number;
};
