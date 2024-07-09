import React, { useRef, useState, useMemo, useCallback } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

import {
  ContainerBook,
  ContainerInfosBook,
  ContainerInputs,
  InputEditBook,
  InputEditBookDescription,
  ContainerButtonAdd,
  ButtonAddBook,
  MainContainer,
  MapWrapper,
  FormWrapper
} from "./styles";

// Ensure Leaflet images are being loaded correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const center = {
  lat: 51.505,
  lng: -0.09,
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
  const navigate = useNavigate();

  const title = useRef();
  const latitude = useRef();
  const longitude = useRef();
  const description = useRef();
  const image = useRef();


  const [position, setPosition] = useState(center);

  async function addReport(e) {
    e.preventDefault();
    console.log("add report");

    const reportData = {
      Type: title.current.value,
      Photos: image.current.value,
      Description: description.current.value,
      Latitude: position.lat,
      Longitude: position.lng,
      /// TODO: TESTE APGARGAR DEPOIS
      Status: "Pending"
    };

    const url = "http://localhost:3000/georeport/report/reportissue";
    const token = sessionStorage.getItem("token");
    try {
      await Axios.post(url, JSON.stringify(reportData), {
        headers: { "Content-Type": "application/json", Authorization: token },
      });
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
          <ContainerBook>
            <ContainerInfosBook onSubmit={addReport}>
              <ContainerInputs>
                <InputEditBook
                  name="name"
                  placeholder="Insert Title"
                  type="text"
                  id="add_title"
                  required
                  ref={title}
                />
                <InputEditBook
                  name="Report image"
                  placeholder="Insert Report image url"
                  type="text"
                  id="add_image"
                  required
                  ref={image}
                />
                <InputEditBookDescription
                  name="descriptionReport"
                  placeholder="Description"
                  type="text"
                  id="add_report_description"
                  required
                  ref={description}
                />
              </ContainerInputs>
              <ContainerButtonAdd>
                <ButtonAddBook>Add</ButtonAddBook>
              </ContainerButtonAdd>
            </ContainerInfosBook>
          </ContainerBook>
        </FormWrapper>
      </MainContainer>
      <Footer />
    </>
  );
};

export default ReportIssue;