import { IIngredient, IIngredientDto, IOrder } from '@interfaces/index';

export const orderToDto = (order: IOrder) => ({
  customer: order.customer.cpf,
  status: order.status,
  value: order.value,
});

export const ingredientToDto = (ingredient: IIngredient): IIngredientDto => ({
  name: ingredient.name,
  quantity: ingredient.stock,
});

export const ingredientFromDto = (ingredient: IIngredientDto): IIngredient => ({
  name: ingredient.name,
  stock: ingredient.quantity,
});

export const ingredientsArrayFromDto = (
  ingredients: IIngredientDto[]
): IIngredient[] => {
  return ingredients.map((item) => ingredientFromDto(item));
};

export default {
  orderToDto,
};
