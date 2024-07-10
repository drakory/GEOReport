import React, { useEffect, useState, useCallback } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Report from "../../components/Report";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { 
  ContainerUser,
  MainContainer,
  MapWrapper,
  FormWrapper,
  Title,
  FiltersWrapper,
  FilterSelect,
  FilterLabel,
  FilterInput,
  ButtonUpdate
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

const UpdateReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = sessionStorage.getItem("token");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const navigate = useNavigate();

  const getReports = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/admin/reports`;
    try {
      const response = await Axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      const reportsData = response.data.reports || [];
      setReports(reportsData);
      setFilteredReports(reportsData);
      setTypes([...new Set(reportsData.map(report => report.type))]);
    } catch (error) {
      console.log(error);
      setReports([]); // Set to empty array on error
    }
  }, [token]);

  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleReportClick = (lat, lng) => {
    setSelectedPosition([lat, lng]);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterReports(type, startDate, endDate);
  };

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    filterReports(selectedType, date, endDate);
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    filterReports(selectedType, startDate, date);
  };

  const filterReports = (type, start, end) => {
    let filtered = reports;
    if (type) {
      filtered = filtered.filter(report => report.type === type);
    }
    if (start) {
      filtered = filtered.filter(report => new Date(report.updated_at) >= new Date(start));
    }
    if (end) {
      filtered = filtered.filter(report => new Date(report.updated_at) <= new Date(end));
    }
    setFilteredReports(filtered);
  };

  const handleRegisterClick = (reportId) => {
    navigate(`/update-report/${reportId}`);
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
            {filteredReports.map((report, index) => (
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
          <FiltersWrapper>
            <FilterLabel>Type:</FilterLabel>
            <FilterSelect value={selectedType} onChange={handleTypeChange}>
              <option value="">All Types</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </FilterSelect>
            <FilterLabel>Start Date:</FilterLabel>
            <FilterInput type="date" value={startDate} onChange={handleStartDateChange} />
            <FilterLabel>End Date:</FilterLabel>
            <FilterInput type="date" value={endDate} onChange={handleEndDateChange} />
          </FiltersWrapper>
          <Title>All Reports</Title>
          <ContainerUser>
            {filteredReports.map((report, index) => (
              <div onClick={() => handleReportClick(report.latitude, report.longitude)} key={index}>
                <Report
                  type={report.type}
                  description={report.description}
                  image={report.photos}
                  latitude={report.latitude}
                  longitude={report.longitude}
                  status={report.status}
                  updated_at={report.updated_at}
                />
                <ButtonUpdate type="button"onClick={() => handleRegisterClick(report.id)}>
                Update
              </ButtonUpdate>
              </div>
            ))}         
          </ContainerUser>
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

export default UpdateReportPage;
