import React, { useRef, useEffect, useState, useCallback } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Report from "../../components/Report";
import {
  ContainerReport,
  ContainerInfosUser,
  ContainerInputs,
  InputEditBook,
  ContainerButtonAdd,
  ButtonAddUpdate,
} from "./styles";

const UpdateReportForm = () => {
  const { id } = useParams();
  const authorityComment = useRef();
  const [report, setReport] = useState([]);
  const [status, setStatus] = useState(""); // New state for status

  const getReport = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/report/${id}`;

    try {
      const response = await Axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      console.log(response.data.report);
      setReport(response.data.report || []);
      setStatus(response.data.report.status); // Set initial status value
    } catch (error) {
      console.log(error);
      setReport([]); // Set to empty array on error
    }
  }, [id]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  async function updateReport(e) {
    e.preventDefault();
    console.log("update report");
    const updateReportRoute = {
      status: status, // Use the state value for status
      authorityComment: authorityComment.current.value,
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/georeport/authority/update/${id}`;
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

  return (
    <>
      <Header />
      <ContainerReport>
        <ToastContainer />
        <ContainerInfosUser onSubmit={updateReport}>

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
            <div>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Being Resolved"
                  checked={status === "Being Resolved"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Being Resolved
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Resolved"
                  checked={status === "Resolved"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Resolved
              </label>
            </div>
            <InputEditBook
              name="authorityComment"
              placeholder="Insert authorityComment"
              type="text"
              id="add_authorityComment"
              required
              ref={authorityComment}
            />
          </ContainerInputs>
          <ContainerButtonAdd>
            <ButtonAddUpdate type="submit">Update</ButtonAddUpdate>
          </ContainerButtonAdd>
        </ContainerInfosUser>
      </ContainerReport>
      <Footer />
    </>
  );
};

export default UpdateReportForm;
