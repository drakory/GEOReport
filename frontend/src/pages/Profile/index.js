import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import User from "../../components/User";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ContainerBooks } from "./styles";
//import { Navigate } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);
  //const [login, setLogin] = useState(false);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      //setLogin(false);
      return;
    }
    console.log(users.user)
    const decodedToken = jwtDecode(token);
    console.log(token);
    const userId = decodedToken.user_id;
    console.log(`Userid = ${userId}`);

    const url = `http://localhost:3000/georeport/user/`;

    try {
      const response = await Axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      //setLogin(false);
      console.log(response.data.user);
      setUsers(response.data.user || []);

    } catch (error) {
      console.log(error);
      setUsers([]); // Set to empty array on error
    }
  }

  return (
    <>
      <Header />
{/*       {login ? (
        <>
          <Navigate to="/gallery" replace={true} />
        </>
      ) : ( */}
        <ContainerBooks>
          Profile
            <User
              userName={users.name}
              userEmail={users.email}
              image={users.profile_picture}
            />
          {/* <Book
          image={books[1].book_cover}
          title={books[1].title}
          showInfo={books[1].description}
        />
        <Book
          image={books[2].book_cover}
          title={books[2].title}
          showInfo={books[2].description}
        /> */}
        </ContainerBooks>
{/*       )} */}
      <Footer />
    </>
  );
};

export default Profile;
