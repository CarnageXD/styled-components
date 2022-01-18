import { Product } from '../models';

function useGetObjectFromArrayItemsName(items: Product[]) {
  return items.reduce((acc: { [key: string]: Product }, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}

export default useGetObjectFromArrayItemsName;
