import {
  ListContainer,
  ReportCard,
  ReportType,
  ReportImage,
  ReportDescription,
  ReportCoordinates,
  ReportStatus   
} from "./styles";
//import Axios from "axios";

const Report = ({ type, image, description, id, latitude, longitude, status }) => {
  //const token = sessionStorage.getItem("token");
  //const isLoggedIn = token !== null;

  /* async function deleteBook(element) {
    console.log("delete book" + id);
    // console.log(element.target);
    // element.target.parentNode.parentNode.remove();

    const url = "http://localhost:3000/api/v1/book/" + id;
    try {
      await Axios.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      refreshBooks(" from delete"); // getbooks from gallery
    } catch (err) {
      console.log(err);
    }
  } */
  return (
    <>
      <ListContainer>
        <ReportCard key={id}>
          <ReportType>{type}</ReportType>
          <ReportImage src={image} alt="report" />
          <ReportDescription>{description}</ReportDescription>
          <ReportCoordinates>
            Lat: {latitude}, Lng: {longitude}
          </ReportCoordinates>
          <ReportStatus>{status}</ReportStatus>
        </ReportCard>
    </ListContainer>
    </>
  );
};

export default Report;
