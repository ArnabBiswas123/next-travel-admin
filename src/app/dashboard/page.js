"use client";
import React from "react";
import HeaderDashboard from "@/components/HeaderDashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";

export default function page() {
  const [userdata, setUserdata] = useState("");
  const router = useRouter();

  const handleClickPending = () => {
    router.push("/dashboard/pending");
  };

  const handleClickAccepted = () => {
    router.push("/dashboard/accepted");
  };
  const handleClickRejected = () => {
    router.push("/dashboard/rejected");
  };

  const fetchData = async (token) => {
    try {
      const result = await fetch(
        "https://next-travel-backend-vercel.vercel.app/api/v1/admin/getadmin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    const token = localStorage.getItem("token");

    if (!token) {
      return router.push("/");
    }
    fetchData(token);
  }, []);

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      <div
        className=" mx-auto my-10 flex justify-center gap-6"
        style={{
          width: "80%",
        }}
      >
        <Cards
          name={"Pending Suppliers"}
          para={"Waiting to be approved"}
          onclick={handleClickPending}
        ></Cards>
        <Cards
          name={"Approved Suppliers"}
          para={"The approved suppliers"}
          onclick={handleClickAccepted}
        ></Cards>
        <Cards
          name={"Rejected Suppliers"}
          para={"The rejected suppliers"}
          onclick={handleClickRejected}
        ></Cards>
      </div>
    </>
  );
}
