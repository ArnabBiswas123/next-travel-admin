import React from 'react'
import HeaderDashboard from "@/components/HeaderDashboard";
import SideBar from "@/components/SideBar";
import { Box } from '@mui/material';
import AllTours from '@/components/AllTours';
export default function page() {
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
         <AllTours></AllTours>
      </Box>
    </>
  )
}
