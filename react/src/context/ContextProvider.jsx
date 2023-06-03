import { createContext, useContext, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../axios-client.js";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  categories: [],
  products: [],
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setCategories: () => {},
  setProducts: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const addCategory = async (category) => {
    const data = await createCategory(category);
    setCategories([...categories, data]);
  };

  const updateCategoryById = async (category) => {
    const data = await updateCategory(category);
    const index = categories.findIndex((c) => c.id === data.id);
    const newCategories = [...categories];
    newCategories[index] = data;
    setCategories(newCategories);
  };

  const deleteCategoryById = async (categoryId) => {
    await deleteCategory(categoryId);
    const newCategories = categories.filter((c) => c.id !== categoryId);
    setCategories(newCategories);
  };

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addProduct = async (product) => {
    const data = await createProduct(product);
    setProducts([...products, data]);
  };

  const updateProductById = async (product) => {
    const data = await updateProduct(product);
    const index = products.findIndex((p) => p.id === data.id);
    const newProducts = [...products];
    newProducts[index] = data;
    setProducts(newProducts);
  };

  const deleteProductById = async (productId) => {
    await deleteProduct(productId);
    const newProducts = products.filter((p) => p.id !== productId);
    setProducts(newProducts);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
        categories,
        setCategories,
        loadCategories,
        addCategory,
        updateCategoryById,
        deleteCategoryById,
        products,
        setProducts,
        loadProducts,
        addProduct,
        updateProductById,
        deleteProductById,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
