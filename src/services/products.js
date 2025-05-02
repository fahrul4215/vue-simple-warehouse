import api from './api';

export const fetchProducts = params =>
    api.get('products', { params });

export const getProduct = id =>
    api.get(`products/${id}`);

export const createProduct = data =>
    api.post('products', data);

export const updateProduct = (id, data) =>
    api.put(`products/${id}`, data);

export const deleteProduct = id =>
    api.delete(`products/${id}`);

export const exportProductsCSV = params =>
    api.get('products/export.csv', {
        params,
        responseType: 'blob',
    });
