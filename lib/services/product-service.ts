import axiosClient from 'lib/api/axios-client';
import { Product, ProductCreateData } from 'lib/types/product';
import { prettyPrint } from 'lib/utils';

export async function getProducts() {
  return (await axiosClient.get<Product[]>('/products')).data;
}

export async function createProduct(input: ProductCreateData) {
  prettyPrint(input);
  return (await axiosClient.post<Product>('/products', input)).data;
}
