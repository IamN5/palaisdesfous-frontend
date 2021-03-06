export enum OrderStatus {
  ToDo = 0,
  InProgress,
  Done,
}

export interface ICustomer {
  cpf: string;
  name: string;
}

export interface IUser {
  cpf: string;
  name: string;
  email: string;
  auth: string;
}

export interface IIngredient {
  name: string;
  stock: number;
}

export interface IIngredientDto {
  name: string;
  quantity: number;
}

export interface IIngredientWrapper {
  ingredient: IIngredient;
  quantity: number;
}
export interface IProduct {
  name: string;
  price: number;
  ingredients: IIngredientWrapper[];
  quantity: number;
}

export interface IProductWrapper {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  id: number;
  status: OrderStatus;
  value: number;
  customer: ICustomer;
  products: IProductWrapper[];
}

export interface INotification {
  title: string;
  message: string;
}
