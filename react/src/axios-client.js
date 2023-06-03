import axios from "axios";
import { useStateContext } from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export const getCategories = async () => {
  try {
    const { data } = await axiosClient.get("/categories");
    const dataSorted = data.data.reverse();
    return dataSorted;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (category) => {
  try {
    const { data } = await axiosClient.post("/categories", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (category) => {
  try {
    const { data } = await axiosClient.put(
      `/categories/${category.id}`,
      category
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const { data } = await axiosClient.delete(`/categories/${categoryId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const { data } = await axiosClient.get("/products");
    const dataSorted = data.data.reverse();
    return dataSorted;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (product) => {
  try {
    const { data } = await axiosClient.post("/products", product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (product) => {
  try {
    const { data } = await axiosClient.put(`/products/${product.id}`, product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await axiosClient.delete(`/products/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getRandomData = async () => {
  try {
    const { data } = await axiosClient.get("/random-data");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default axiosClient;