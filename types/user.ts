export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  address?: Address;
  createdAt: string;
}