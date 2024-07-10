import React, { useState } from "react";
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
  HamburgerIcon,
  CloseIcon,
  MobileMenu
} from "./styles";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.svg";
import home from "../../assets/home.svg";
import hamburger from "../../assets/hamburger.svg";
import close from "../../assets/close.svg";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

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
                <Button onClick={() => navigate("/myreports")}>My Reports</Button>
                <Button onClick={() => navigate("/reportIssue")}>Report Issue</Button>
                <a title="Your Profile" href="/profile">
                  <ProfileIcon src={profile} alt="Profile icon" />
                </a>
              </>
            ) : (
              <>
                <ButtonLogin onClick={login}>Login</ButtonLogin>
              </>
            )}
          </ContainerMenu>
          <HamburgerIcon src={hamburger} alt="Menu" onClick={toggleMobileMenu} />
        </ContainerLinks>
        {isMobileMenuOpen && (
          <MobileMenu>
            <CloseIcon src={close} alt="Close" onClick={toggleMobileMenu} />
            {isLoggedIn ? (
              <>
                <ButtonLogout onClick={logout}>Logout</ButtonLogout>
                <Button onClick={() => navigate("/myreports")}>My Reports</Button>
                <Button onClick={() => navigate("/reportIssue")}>Report Issue</Button>
                <a title="Your Profile" href="/profile">
                  <ProfileIcon src={profile} alt="Profile icon" />
                </a>
              </>
            ) : (
              <>
                <ButtonLogin onClick={login}>Login</ButtonLogin>
              </>
            )}
          </MobileMenu>
        )}
      </header>
      <Row />
    </>
  );
};

export default Header;
