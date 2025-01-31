import React, { useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ContainerUser,
  ContainerInfosUser,
  ContainerInputs,
  InputEditUser,
  ContainerButtonAdd,
  ButtonAdd,
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
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/user/registration`;
    const token = sessionStorage.getItem("token");

    try {
      await Axios.post(url, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json", Authorization: token },
      });
      toast.success("User added successfully!");

      //navigate("/");
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
      <ContainerUser>
        <ToastContainer />
        <ContainerInfosUser onSubmit={addUser}>
          <ContainerInputs>
            <InputEditUser
              name="name"
              placeholder="Insert name"
              type="text"
              id="add_name"
              required
              ref={name}
            />
            <InputEditUser
              name="titleBook"
              placeholder="Insert email"
              type="text"
              id="add_email"
              required
              ref={email}
            />
            <InputEditUser
              name="profilePicture"
              placeholder="Insert profile picture URL"
              type="text"
              id="add_profile_picture"
              ref={profilePicture}
            />
            <InputEditUser
              name="titleBook"
              placeholder="Insert password"
              type="password" 
              id="add_password"
              required
              ref={password}
            />
          </ContainerInputs>
          <ContainerButtonAdd>
            <ButtonAdd type="submit">Add</ButtonAdd>
          </ContainerButtonAdd>
        </ContainerInfosUser>
      </ContainerUser>
      <Footer />
    </>
  );
};

export default Register;
