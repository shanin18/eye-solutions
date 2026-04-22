export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  fee: number;
  schedule: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  type: "Clinical" | "Optical Shop" | "Retail";
  duration: string;
  priceLabel: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceLabel: string;
  stock: number;
};

