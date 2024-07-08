import {
  ContainerUser,
  UserName,
  UserEmail,
  ContainerImage,
  ImageUser,
  Button,
} from "./styles";

const User = ({ userName, image, userEmail }) => {
  const isLoggedIn = false;

  function deleteUser(element) {
    console.log("delete user");
    console.log(element.target);
    element.target.parentNode.parentNode.remove();
  }
  return (
    <>
      <ContainerUser>
        <UserName>{userName}</UserName>
        <UserEmail>{userEmail}</UserEmail>
        <ContainerImage>
          <ImageUser src={image} />
        </ContainerImage>
      </ContainerUser>
    </>
  );
};

export default User;
