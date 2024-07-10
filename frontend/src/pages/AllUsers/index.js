import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import User from "../../components/User";
import Axios from "axios";
import { ContainerUsers } from "./styles";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/user/`;
    try {
      const response = await Axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data.message);
      setUsers(response.data.message || []);
    } catch (error) {
      console.log(error);
      setUsers([]); // Set to empty array on error
    }
  }

  return (
    <>
      <Header />
      <ContainerUsers>
        All Users
        {users.map((user, index) => (
          <User
            userName={user.name}
            userEmail={user.email}
            image={user.profile_picture}
            key={index}
          />
        ))}
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
      </ContainerUsers>
      <Footer />
    </>
  );
};

export default AllUsers;
