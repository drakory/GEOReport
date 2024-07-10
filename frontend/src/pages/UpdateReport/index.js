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
  ButtonAddUser,
} from "./styles";

const UpdateReport = () => {
  const navigate = useNavigate();

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const profilePicture = useRef();

  async function updateUser(e) {
    e.preventDefault();
    console.log("add user");

    const newUser = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      profile_picture: profilePicture.current.value,
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/authority/update/5`;
    const token = sessionStorage.getItem("token");

    try {
      console.log(JSON.stringify(newUser));
      const response = await Axios.put(url, newUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success("Report added successfully!");
      console.log("SUCESS!!")
      //navigate("/profile");
    } catch (error) {
      console.log("ERROR UPDATING");
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
        <ContainerInfosUser onSubmit={updateUser}>
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
          </ContainerInputs>
          <ContainerButtonAdd>
            <ButtonAddUser type="submit">Update User</ButtonAddUser>
          </ContainerButtonAdd>
        </ContainerInfosUser>
      </ContainerUser>
      <Footer />
    </>
  );
};

export default UpdateReport;
