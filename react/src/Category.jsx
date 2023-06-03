import { useEffect, useState } from "react";
import axiosClient from "./axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider.jsx";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNotification } = useStateContext();
  let customId = 1;
  useEffect(() => {
    getCategories();
  }, []);

  const onDeleteClick = (category) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
      return;
    }
    axiosClient.delete(`/categories/${category.id}`).then(() => {
      setNotification("Категория успешно удалена");
      getCategories();
    });
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosClient.get("/categories");
      const dataSorted = data;
      setCategories(dataSorted);
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
        <h1>Category</h1>
        <Link className="btn-add" to="/category/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {categories.map((c) => (
                <tr key={customId}>
                  <td>{customId++}</td>
                  <td>{c.name}</td>
                  <td>
                    <Link className="btn-edit" to={"/categories/" + c.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(c)}
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
