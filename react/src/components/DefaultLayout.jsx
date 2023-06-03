import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = async (ev) => {
    try {
      ev.preventDefault();
      const url = "/logout";
      const data = await axiosClient.post(url);
      setUser({});
      setToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const url = "/user";
      const data = await axiosClient.get(url);
      const res = await data.data;
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="wrapper">
      <div id="defaultLayout">
        <aside>
          <Link to="/users">Users</Link>
          <Link to="/category">Category</Link>
          <Link to="/products">Products</Link>
          <Link to="/dashboard">Dashboard</Link>
        </aside>
        <div className="content">
          <header>
            <Link to="/Home" className="btn-header">
              Home
            </Link>
            <Link to="/Endpoints" className="btn-header">
              Endpoints
            </Link>
            <Link to="/About" className="btn-header">
              About
            </Link>
            <Link to="/Cabinet" className="btn-header">
              Здравствуйте, {user.name} &nbsp; &nbsp;
            </Link>
            <a onClick={onLogout} className="btn-header" href="#">
              Logout
            </a>
          </header>
          <main>
            <Outlet />
          </main>
          {notification && <div className="notification">{notification}</div>}
        </div>
      </div>
    </div>
  );
}
