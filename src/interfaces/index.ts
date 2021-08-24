export enum OrderStatus {
  ToDo = 0,
  InProgress,
  Done,
}

export interface ICustomer {
  cpf: string;
  name: string;
}

export interface IIngredient {
  name: string;
  stock: number;
}

export interface IProduct {
  name: string;
  price: number;
  ingredients: IIngredient[];
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

export enum NotificationTypes {
  NOTIFICATION_SUCCESS = 'notification/success',
  NOTIFICATION_ERROR = 'notification/error',
  NOTIFICATION_NEUTRAL = 'notification/neutral',
  NOTIFICATION_NONE = 'notification/none',
}

export interface INotification {
  readonly type: NotificationTypes;
  title: string;
  message: string;
}
