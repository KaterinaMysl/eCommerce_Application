import { Cart } from '@commercetools/platform-sdk';
import { CartDraw } from '../type';

export const cartToDrawProducts = (cart: Cart) => {
  const cartDrawArray: CartDraw[] = [];

  cart.lineItems.forEach(product => {
    const productItem = {
      name: product.name.en,
      quantity: product.quantity,
      price: product.price.value.centAmount,
      discount: product.price.discounted?.value.centAmount,
      images: product.variant.images?.[0].url as string,
      id: product.productId,
      lineItemId: product.id,
    };
    cartDrawArray.push(productItem);
  });

  return {
    cartProducts: cartDrawArray,
    price: cart.totalPrice.centAmount,
  };
};
