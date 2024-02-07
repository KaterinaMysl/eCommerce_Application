import { Cart } from '@commercetools/platform-sdk';
import { CartDraw, Discount } from '../type';
import StorageController from './StorageController';

export const cartToDrawProducts = (cart: Cart) => {
  const cartDrawArray: CartDraw[] = [];
  const storages = new StorageController();
  cart.lineItems.forEach(product => {
    const productItem = {
      name: product.name.en,
      quantity: product.quantity,
      price: product.price.value.centAmount,
      discount: product.price.discounted?.value.centAmount,
      discountCode:
        product.discountedPricePerQuantity?.[0]?.discountedPrice.value
          .centAmount,
      images: product.variant.images?.[0].url as string,
      id: product.productId,
      lineItemId: product.id,
      key: product.productKey || '',
    };
    cartDrawArray.push(productItem);
  });
  const discounts: Discount[] = storages.getDiscounts();
  const activeDiscount: (Discount | undefined)[] = cart.discountCodes.map(
    code => discounts.find(discount => discount.id === code.discountCode.id),
  );
  const activeDiscountFiltered: Discount[] | undefined = activeDiscount.filter(
    discount => discount !== undefined,
  ) as Discount[] | undefined;
  if (activeDiscountFiltered) {
    storages.setActiveDiscounts(activeDiscountFiltered);
  }
  return {
    cartProducts: cartDrawArray,
    price: cart.totalPrice.centAmount,
    count: cart.totalLineItemQuantity || 0,
  };
};
