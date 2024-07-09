import { ContainerFooter } from "./styles";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <ContainerFooter>
      <p>Project GeoReport Pweb {year}</p>
    </ContainerFooter>
  );
};

export default Footer;
