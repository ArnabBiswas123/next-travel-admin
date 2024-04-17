"use client";
import React from "react";
import { useState, useEffect } from "react";
import HeaderDashboard from "@/components/HeaderDashboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ViewModal from "@/components/ViewModal";

export default function page() {
  const [userdata, setUserdata] = useState([]);
  const router = useRouter();
  const [errormsg, setErrormsg] = useState("");
  const [open, setOpen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [successmsg, setSuccessMsg] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchData = async (token) => {
    try {
      const result = await fetch(
        "https://next-travel-backend-vercel.vercel.app/api/v1/admin/acceptedsupplier",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await result.json();

      //   console.log(json);

      if (json.success === false) {
        localStorage.removeItem("token");
        return router.push("/login");
      } else {
        setUserdata(json.suppliers);
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
  }, [fetchAgain]);

  const handleReject = async (id) => {
    // console.log(id)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    if (window.confirm("Are you sure you want to reject this supplier?")) {
      const response = await fetch(
        "https://next-travel-backend-vercel.vercel.app/api/v1/admin/rejectsupplier",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            supplierID: id,
          }),
        }
      );
      const data = await response.json();
      if (data.success === true) {
        setSuccessMsg("The Supplier is rejected successfully");
        setOpenApprove(true);
        setFetchAgain((prev) => {
          !prev;
        });
      } else {
        if (data.msg === "Token is not there") {
          localStorage.removeItem("token");
          router.push("/");
        } else {
          setErrormsg(data.msg);
        }
      }
    } else {
      return;
    }
  };

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

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
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
      <TableContainer component={Paper} sx={{ my: 6 }}>
        <div className=" text-black font-home font-semibold underline text-2xl my-2 flex justify-center">
          Accepted Suppliers
        </div>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Owner Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Company Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Business Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                View
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Reject
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdata.length > 0
              ? userdata.map((item, index) => {
                  return (
                    <>
                      {" "}
                      {openModal ? (
                        <ViewModal
                          openModal={openModal}
                          items={item}
                          onCloseModal={handleCloseModal}
                        ></ViewModal>
                      ) : (
                        ""
                      )}
                      <TableRow key={index}>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.owner_name}</TableCell>
                        <TableCell align="center">
                          {item.company_name}
                        </TableCell>
                        <TableCell align="center">
                          {item.business_name}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            src={"/eye1.png"}
                            width={30}
                            height={10}
                            onClick={handleOpenModal}
                            style={{ display: "inline-block" }}
                          ></Image>
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleReject(item._id);
                          }}
                        >
                          <Image
                            src={"/reject.png"}
                            width={30}
                            height={10}
                            style={{ display: "inline-block" }}
                          ></Image>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            src={"/trash.png"}
                            width={30}
                            height={10}
                            style={{ display: "inline-block" }}
                          ></Image>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
