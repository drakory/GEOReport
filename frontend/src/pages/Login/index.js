import React, { useRef, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ContainerFormLogin,
  FormLogin,
  InputProfile,
  ContainerAllButtons,
  ContainerButton,
  ButtonLogin,
  ButtonRegister,
} from "./styles";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (login) {
      navigate("/profile");
    }
  }, [login, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit");

    await loginUser({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  async function loginUser(credentials) {
    console.log("login user");
    console.log(credentials);
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/auth/login`;
    try {
      const response = await Axios.post(url, JSON.stringify(credentials), {
        headers: { "Content-Type": "application/json" },
      });
      console.log("user is valid!");
      console.log(response.data.token);

      sessionStorage.setItem("token", response.data.token);
      setLogin(true);

    } catch (error) {
      sessionStorage.removeItem("token");
      console.error("Error response:", error.response);
      setLogin(false);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
      });
      console.log("user is invalid!");
    }
  }

  function registerButton() {
    console.log("navigate to register");
    navigate("/register");
  }

  return (
    <>
      <Header />
      <ContainerFormLogin>
        <FormLogin onSubmit={handleSubmit}>
          <InputProfile
            placeholder="Email"
            name="email"
            type="text"
            ref={emailRef}
            required
          ></InputProfile>
          <InputProfile
            placeholder="Password"
            name="passwUser"
            type="password"
            ref={passwordRef}
            required
          ></InputProfile>
          <ContainerAllButtons>
            <ContainerButton>
              <ButtonLogin type="submit">Login</ButtonLogin>
            </ContainerButton>
            <ContainerButton>
              <ButtonRegister type="button" onClick={registerButton}>
                Register
              </ButtonRegister>
            </ContainerButton>
          </ContainerAllButtons>
        </FormLogin>
      </ContainerFormLogin>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Login;
