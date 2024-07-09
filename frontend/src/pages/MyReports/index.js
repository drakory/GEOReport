import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Report from "../../components/Report";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { 
  ContainerBooks,
  MainContainer,
  MapWrapper,
  FormWrapper,
} from "./styles";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const center = {
  lat: 41.1579,
  lng: -8.6291,
};

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const token = sessionStorage.getItem("token");
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    getReports();
  }, []);

  async function getReports() {
    const url = "http://localhost:3000/georeport/report/";
    try {
      const response = await Axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      console.log(response.data.reports);
      setReports(response.data.reports || []);
    } catch (error) {
      console.log(error);
      setReports([]); // Set to empty array on error
    }
  }

  const handleReportClick = (lat, lng) => {
    setSelectedPosition([lat, lng]);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <MapWrapper>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.map((report, index) => (
              <Marker key={index} position={[report.latitude, report.longitude]}>
                <Popup>
                  {report.type}
                </Popup>
              </Marker>
            ))}
            {selectedPosition && <MoveMap position={selectedPosition} />}
          </MapContainer>
        </MapWrapper>
        <FormWrapper>
          <ContainerBooks>
            {reports.map((report, index) => (
              <div onClick={() => handleReportClick(report.latitude, report.longitude)} key={index}>
                <Report
                  type={report.type}
                  description={report.description}
                  image={report.photos}
                  latitude={report.latitude}
                  longitude={report.longitude}
                />
              </div>
            ))}
          </ContainerBooks>
        </FormWrapper>
      </MainContainer>
      <Footer />
    </>
  );
};

const MoveMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13, { animate: true });
  }, [position, map]);
  return null;
};

export default MyReports;