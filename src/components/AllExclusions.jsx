"use client";
import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import ViewExclusionModal from "./ViewExclusionModal";
// const fetchURL = "http://localhost:5000";
const fetchURL='https://next-travel-backend-vercel.vercel.app'

export default function AllExclusions() {
  const router = useRouter();
  const [userdata, setUserdata] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Add state for the selected item

  const handleOpenModal = (item) => { // Modify handleOpenModal to set selected item
    setSelectedItem(item);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleClose = (event, reason) => {
  
    setOpen(false);
  };
  const againFetch = () => {
    // console.log('fetch')
    setFetchAgain((prev) => 
      !prev
    );
  };



  const fetchData = async (token) => {
    try {
      const result = await fetch(`${fetchURL}/api/v1/admin/getallexclusions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await result.json();

      if (json.success === false) {
        localStorage.removeItem("token");
        return router.push("/");
      } else {
        setUserdata(json.exclusions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
      if (window.confirm("Are you sure you want to delete this category?")) {
        const response = await fetch(
          `${fetchURL}/api/v1/admin/deleteexclusions`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );
        const data = await response.json();
        if (data.success === true) {
          //   setSuccessMsg("The Supplier is approved successfully");
          //   setOpenApprove(true);
          setFetchAgain((prev) => 
            !prev
          );
        } else {
          if (data.msg === "Token is not there") {
            localStorage.removeItem("token");
            router.push("/");
          } else {
            setErrormsg(data.msg);
            setOpen(true);
          }
        }
      } else {
        return;
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
      <TableContainer component={Paper}>
        <div className=" text-black font-home font-semibold underline text-2xl my-2 flex justify-center">
        Exclusions
        </div>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Exclusion Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Exclusion status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                View/Edit
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdata
              ? userdata.map((item, index) => {
                  return (
                    <>
                      <TableRow
                        key={index}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 }, display:'flex', flexDirection:'row' }}
                      >
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.status}</TableCell>

                        <TableCell
                          align="center"
                          onClick={() => handleOpenModal(item)}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            src={"/edit.svg"}
                            width={30}
                            height={10}
                            // onClick={handleOpenModal}
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
                            src={"/delete.svg"}
                            width={30}
                            height={10}
                            style={{ display: "inline-block" }}
                            onClick={() => handleDelete(item._id)}
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
      {selectedItem && ( // Render the modal only if selectedItem is truthy
        <ViewExclusionModal
          openModal={openModal}
          items={selectedItem}
          parentfetchAgain={againFetch}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
