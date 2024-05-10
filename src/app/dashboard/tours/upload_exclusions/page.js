"use client";
import React from "react";
import HeaderDashboard from "@/components/HeaderDashboard";
import SideBar from "@/components/SideBar";
import ExclusionForm from "@/components/ExclusionForm";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// const fetchURL = "http://localhost:5000";
const fetchURL='https://next-travel-backend-vercel.vercel.app'

export default function page() {
  const [userdata, setUserdata] = useState("");


  const router = useRouter();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return router.push("/");
      }
      const result = await fetch(`${fetchURL}/api/v1/admin/getadmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await result.json();

      if (json.success === false) {
        localStorage.removeItem("token");
        return router.push("/");
      } else {
        setUserdata(json.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      <Box
        sx={{
          maxWidth: "100vw",
          minH: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SideBar></SideBar>
        <ExclusionForm></ExclusionForm>
      </Box>
    </>
  );
}
