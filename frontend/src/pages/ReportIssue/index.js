import React, { useRef, useState, useMemo, useCallback } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  ContainerReport,
  ContainerInfosReport,
  ContainerInputs,
  InputEditReport,
  InputEditReportDescription,
  ContainerButtonAdd,
  ButtonAddReport,
  MainContainer,
  MapWrapper,
  FormWrapper,
  Title
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

function DraggableMarker({ position, setPosition }) {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

function ClickableMap({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

const ReportIssue = () => {

  const type = useRef();
  const description = useRef();
  const image = useRef();


  const [position, setPosition] = useState(center);

  async function addReport(e) {
    e.preventDefault();
    console.log("add report");

    const reportData = {
      Type: type.current.value,
      Photos: image.current.value,
      Description: description.current.value,
      Latitude: position.lat,
      Longitude: position.lng,
      /// TODO: TESTE APGARGAR DEPOIS
      Status: "Pending"
    };

    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/report/reportissue`;
    const token = sessionStorage.getItem("token");
    try {
      await Axios.post(url, JSON.stringify(reportData), {
        headers: { "Content-Type": "application/json", Authorization: token },
      });
      toast.success("Report added successfully!");
      console.log("SUCESS!!")
    } catch (error) {
      console.log(error);
    }
  }

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
            <DraggableMarker position={position} setPosition={setPosition} />
            <ClickableMap setPosition={setPosition} />
          </MapContainer>
        </MapWrapper>
        <FormWrapper>
        <Title>Report a new issue</Title>
          <ContainerReport>
            <ContainerInfosReport onSubmit={addReport}>
              <ContainerInputs>
                <InputEditReport
                  name="type"
                  placeholder="Insert Type"
                  type="text"
                  id="add_type"
                  required
                  ref={type}
                />
                <InputEditReport
                  name="Report image"
                  placeholder="Insert Report image url"
                  type="text"
                  id="add_image"
                  required
                  ref={image}
                />
                <InputEditReportDescription
                  name="descriptionReport"
                  placeholder="Description"
                  type="text"
                  id="add_report_description"
                  required
                  ref={description}
                />
              </ContainerInputs>
              <ContainerButtonAdd>
                <ButtonAddReport>Add</ButtonAddReport>
              </ContainerButtonAdd>
            </ContainerInfosReport>
          </ContainerReport>
        </FormWrapper>
      </MainContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ReportIssue;