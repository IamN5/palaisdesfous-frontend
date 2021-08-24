import { IOrder } from '@interfaces/index';

export const orderToDto = (order: IOrder) => ({
  customer: order.customer.cpf,
  status: order.status,
  value: order.value,
});

export default {
  orderToDto,
};
