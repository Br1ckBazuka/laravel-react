import { useEffect, useState } from "react";
import axiosClient from "./axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider.jsx";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNotification } = useStateContext();
  let customId = 1;
  useEffect(() => {
    getProducts();
  }, []);

  const onDeleteClick = (product) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
      return;
    }
    axiosClient.delete(`/products/${product.id}`).then(() => {
      setNotification("Продукт успешно удален");
      getProducts();
    });
  };

  const getProducts = async () => {
    try {
      const { data } = await axiosClient.get("/products");
      const dataSorted = data;
      setProducts(dataSorted);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Product</h1>
        <Link className="btn-add" to="/product/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {products.map((p) => (
                <tr key={customId}>
                  <td>{customId++}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <Link className="btn-edit" to={"/products/" + p.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
