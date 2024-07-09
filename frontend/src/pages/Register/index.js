import React, { useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ContainerBook,
  ContainerInfosBook,
  ContainerInputs,
  InputEditBook,
  ContainerButtonAdd,
  ButtonAddBook,
} from "./styles";

const Register = () => {
  const navigate = useNavigate();

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const profilePicture = useRef();

  async function addUser(e) {
    e.preventDefault();
    console.log("add user");

    const newUser = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      profilePicture: profilePicture.current.value,
    };
    const url = "http://localhost:3000/georeport/user/registration";
    const token = sessionStorage.getItem("token");

    try {
      await Axios.post(url, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json", Authorization: token },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Header />
      <ContainerBook>
        <ToastContainer />
        <ContainerInfosBook onSubmit={addUser}>
          <ContainerInputs>
            <InputEditBook
              name="name"
              placeholder="Insert name"
              type="text"
              id="add_name"
              required
              ref={name}
            />
            <InputEditBook
              name="titleBook"
              placeholder="Insert email"
              type="text"
              id="add_email"
              required
              ref={email}
            />
            <InputEditBook
              name="profilePicture"
              placeholder="Insert profile picture URL"
              type="text"
              id="add_profile_picture"
              ref={profilePicture}
            />
            <InputEditBook
              name="titleBook"
              placeholder="Insert password"
              type="password" 
              id="add_password"
              required
              ref={password}
            />
          </ContainerInputs>
          <ContainerButtonAdd>
            <ButtonAddBook type="submit">Add</ButtonAddBook>
          </ContainerButtonAdd>
        </ContainerInfosBook>
      </ContainerBook>
      <Footer />
    </>
  );
};

export default Register;
