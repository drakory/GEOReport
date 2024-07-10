import React, { useRef, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Report from "../../components/Report";
import {
  ContainerReport,
  ContainerInfoReport,
  ContainerInputs,
  InputEditRepor,
  ContainerButtonAdd,
  ButtonAddBook,
  ButtonDelete
} from "./styles";

const MyReportUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const type = useRef(null);
  const description = useRef(null);
  const photos = useRef(null);
  const [report, setReport] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  async function updateReport(e) {
    e.preventDefault();
    console.log("update report user");
    const updateReportRoute = {
      type: type.current.value,
      description: description.current.value,
      photos: photos.current.value,
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/report/update/${id}`;
    const token = sessionStorage.getItem("token");

    try {
      await Axios.put(url, JSON.stringify(updateReportRoute), {
        headers: { "Content-Type": "application/json", Authorization: token },
      });
      toast.success("Updated Success!");
      console.log("Report Updated");
      getReport();
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Update Failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  }

  async function getReport() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/report/${id}`;

    try {
      const response = await Axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.report);
      setReport(response.data.report || []);
      if (response.data.report) {
        type.current.value = response.data.report.type;
        description.current.value = response.data.report.description;
        photos.current.value = response.data.report.photos;
      }
    } catch (error) {
      console.log(error);
      setReport([]); // Set to empty array on error
    }
  }

  async function deleteReport() {
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/report/delete/${report.id}`;
    const token = sessionStorage.getItem("token");

    try {
      await Axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Report Deleted Successfully!");
      console.log("Report Deleted");
      navigate("/myreports"); 
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Delete Failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Header />
      <ContainerReport>
        <ToastContainer />
        <ContainerInfoReport onSubmit={updateReport}>
          <Report
            type={report.type}
            description={report.description}
            image={report.photos}
            latitude={report.latitude}
            longitude={report.longitude}
            status={report.status}
            updated_at={report.updated_at}
          />
          <ContainerInputs>
            <InputEditRepor
              name="Type"
              placeholder="Insert Type"
              type="text"
              id="add_Type"
              required
              ref={type}
            />
            <InputEditRepor
              name="Description"
              placeholder="Insert Description"
              type="text"
              id="add_Description"
              required
              ref={description}
            />
            <InputEditRepor
              name="Photos"
              placeholder="Insert Photos"
              type="text"
              id="add_Photos"
              required
              ref={photos}
            />
          </ContainerInputs>
          <ContainerButtonAdd>
            <ButtonAddBook type="submit">Update</ButtonAddBook>
          </ContainerButtonAdd>
          <ButtonDelete type="button" onClick={deleteReport}>
            Delete
          </ButtonDelete>
        </ContainerInfoReport>
      </ContainerReport>
      <Footer />
    </>
  );
};

export default MyReportUpdateForm;
