import axiosClient from 'lib/api/axios-client';
import { Product, ProductCreateData, ProductUpdateData } from 'lib/types/product';

export async function getProducts() {
  return (await axiosClient.get<Product[]>('/products')).data;
}

export async function getProduct(id: number) {
  return (await axiosClient.get<Product>(`/products/${id}`)).data;
}

export async function createProduct(input: ProductCreateData) {
  return (await axiosClient.post<Product>('/products', input)).data;
}

export async function updateProduct(id: number, input: ProductUpdateData) {
  return (await axiosClient.put<Product>(`/products/${id}`, input)).data;
}

export async function deleteProduct(id: number) {
  return (await axiosClient.delete(`/products/${id}`)).data;
}
