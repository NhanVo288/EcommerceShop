import axiosInstance from './axios';

class ProductApi {
  constructor() {
    this.basePath = '/api/v1/product';
    this.config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  }

  request(method, url, data, config) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](`${this.basePath}${url}`, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }
  Getoptions() {
    return this.request('get', '/options');
  }
  GetProducts() {
    return this.request('get', '/');
  }

  GetOneProduct(id) {
    return this.request('get', `/${id}`);
  }

  AddProduct(data) {
    return this.request('post', '/add', data, this.config);
  }

  UpdateProduct(id, data) {
    return this.request('patch', `/${id}`, data, this.config);
  }

  DeleteProduct(id) {
    return this.request('delete', `/${id}`);
  }
  DeleteProductImage(id, data) {
    return this.request('patch', `/${id}/image`, data);
  }
  GetClientProducts() {
    return this.request('get', `/client/Products`);
  }
  GetClientOneProduct(id) {
    return this.request('get', `/client/${id}`);
  }
  GetCategories() {
    return this.request('get', `/categories/client/`);
  }
  GetSearchProducts(data) {
    return this.request('get', `/eCommerceShop/search?page=${data.page}&query=${data.query}&category=${data.category}&price=${data.price}&sort=${data.sort}&brand=${data.brand}&size=${data.size}`);
  }
  getRelatedProducts(id) {
    return this.request('get', `/relatedProducts/${id}`);
  }
}

export const productApi = new ProductApi();
