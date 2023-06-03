import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function CategoryForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [category, setCategory] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const { data } = await axiosClient.get(`/categories/${id}`);
          setLoading(false);
          setCategory(data);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (category.id) {
        await axiosClient.put(`/categories/${category.id}`, category);
        setNotification("Category was successfully updated");
      } else {
        await axiosClient.post("/categories", category);
        setNotification("Category was successfully created");
      }
      navigate("/categories");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <>
      {category.id && <h1>Update Category: {category.name}</h1>}
      {!category.id && <h1>New Category</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={category.name}
                onChange={(ev) =>
                  setCategory({ ...category, name: ev.target.value })
                }
              />
              {errors && errors.name && (
                <div className="invalid-feedback">{errors.name[0]}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={category.description}
                onChange={(ev) =>
                  setCategory({ ...category, description: ev.target.value })
                }
              ></textarea>
              {errors && errors.description && (
                <div className="invalid-feedback">{errors.description[0]}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {category.id ? "Update" : "Create"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
