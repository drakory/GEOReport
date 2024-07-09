import React from "react";
import {
  ContainerLinks,
  Logo,
  ProfileIcon,
  Row,
  ContainerMenu,
  LinkHome,
  ButtonLogout,
  ButtonLogin,
  Button,
} from "./styles";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.svg";
import home from "../../assets/home.svg";

const Header = () => {
  const token = sessionStorage.getItem("token");
  const isLoggedIn = token !== null;

  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("token");
    console.log("logout");
    navigate("/login");
  }

  function login() {
    console.log("login");
    navigate("/login");
  }

  function gallery() {
    console.log("gallery");
    navigate("/gallery");
  }

  return (
    <>
      <header>
        <ContainerLinks>
          <LinkHome title="Home Page" to="/">
            <Logo src={home} alt="logo" />
          </LinkHome>
          <ContainerMenu>
            {isLoggedIn ? (
              <>
                <ButtonLogout onClick={logout}>Logout</ButtonLogout>
                <Button onClick={() => navigate("/allusers")}>All Users</Button>
                <Button onClick={() => navigate("/reportIssue")}>Report Issue</Button>
                <a title="Your Profile" href="/profile">
                  <ProfileIcon src={profile} alt="Profile icon" />
                </a>
              </>
            ) : (
              <>
                <ButtonLogin onClick={login}>Login</ButtonLogin>
                <ButtonLogin onClick={gallery}>Gallery</ButtonLogin>
              </>
            )}
          </ContainerMenu>
        </ContainerLinks>
      </header>
      <Row />
    </>
  );
};

export default Header;
