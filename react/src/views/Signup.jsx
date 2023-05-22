import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    try {
      const { data } = await axiosClient.post("/signup", payload);
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Регистрация</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="Полное имя" />
          <input ref={emailRef} type="email" placeholder="Почта" />
          <input ref={passwordRef} type="password" placeholder="Пароль" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Повторите пароль"
          />
          <button className="btn btn-block">Зарегистрироваться</button>
          <p className="message">
            Уже зарегистрирован? <Link to="/login">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
