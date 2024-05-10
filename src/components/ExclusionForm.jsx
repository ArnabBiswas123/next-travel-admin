"use client";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
// const fetchURL = "http://localhost:5000";
const fetchURL='https://next-travel-backend-vercel.vercel.app'

export default function InclusionForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({
    name: "",
  });
  const [errormsg, setErrormsg] = useState("");
  const [open, setOpen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [successmsg, setSuccessMsg] = useState("");

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };
  const handleCloseApprove = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpenApprove(false);
  };

  const submitHandler = async () => {
    try {
      let newErrors = {};
      if (name === "") newErrors.name = "Enter a Inclusion name";

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        const token = localStorage.getItem("token");

        if (!token) {
          return router.push("/");
        }
        const response = await fetch(
          `${fetchURL}/api/v1/admin/createexclusion`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: name,
              status: status,
            }),
          }
        );
        const data = await response.json();
        if (data.success === true) {
          setSuccessMsg("The exclusion is added successfully");
          setOpenApprove(true);
        } else {
          if (data.msg === "Token is not there") {
            localStorage.removeItem("token");
            router.push("/");
          } else {
            setErrormsg(data.msg);
            setOpen(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert severity="error">{errormsg}</Alert>
      </Snackbar>
      <Snackbar
        open={openApprove}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseApprove}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert severity="success">{successmsg}</Alert>
      </Snackbar>
      <div
        className=" mx-auto space-y-4 mt-20 w-1/2 overflow-hidden"
        style={{
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label className=" font-home ">Name of the exclusion</label>
          <input
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={name}
            placeholder="Enter Name of the exclusion"
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name ? (
            <p className=" text-red-600 text-xs font-home m-0 p-0">
              Inclusion name is required
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <label className=" font-home ">Inclusion Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            className="shadow border font-home rounded w-full focus:outline-none  py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          className=" font-home"
          style={{
            backgroundColor: "#3B82F6", // Tailwind CSS blue-500
            color: "#FFFFFF", // White color
            padding: "0.5rem 1rem", // Padding
            borderRadius: "0.375rem", // Rounded corners
            cursor: "pointer", // Pointer cursor on hover
            transition: "background-color 0.3s ease-in-out", // Smooth background color transition on hover
          }}
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </>
  );
}
