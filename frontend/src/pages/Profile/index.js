import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import User from "../../components/User";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ContainerUser, Title, ButtonUpdate } from "./styles";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
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

    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/user/`;

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

  function updateReports() {
    console.log("navigate to updateReports");
    navigate("/updatereportpage");
  }

  return (
    <>
      <Header />
      <Title>Profile</Title>
        <ContainerUser>
            <User
              userName={users.name}
              userEmail={users.email}
              image={users.profile_picture}
            />
            
        </ContainerUser>
        {users.role === "AUTHORITY" && (
              <ButtonUpdate type="button" onClick={updateReports}>
                Update Reports
              </ButtonUpdate>
            )}
      <Footer />
    </>
  );
};

export default Profile;
