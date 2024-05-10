"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import Modal from '@mui/material/Modal';
import { useState , useEffect} from 'react';
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,


  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};
// const fetchURL='http://localhost:5000'
const fetchURL='https://next-travel-backend-vercel.vercel.app'
export default function ViewInclusionModal({openModal, onCloseModal,    parentfetchAgain, items}) {
//  console.log(items.name)
 const [name,setName]=useState('')
 const [status,setStatus]=useState('')
 const [errors, setErrors] = useState({
  name: "",
});
const router=useRouter();

 const submitHandler=async()=>{
  try{
    let newErrors = {};
      if (name === "") newErrors.name = "Enter a Inclusion name";

      setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //
      const token = localStorage.getItem("token");
      if (!token) {
        return router.push("/");
      }
      const response = await fetch(`${fetchURL}/api/v1/admin/editinclusions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id:items._id,
          name: name,
          status:status
        }),
      });
      const data = await response.json();
      // console.log(data)
      if (data.success === true) {
        // setSuccessMsg("The category is added successfully")
        // setOpenApprove(true);
        // console.log(true)
        // onCloseModal();
        parentfetchAgain();
        onCloseModal();
      }
        else {
          if (data.msg === "Token is not there"||data.msg==="Token is not correct") {
            localStorage.removeItem("token");
            router.push("/");
          } else {
            // setErrormsg(data.msg);
            // setOpen(true)
          }}

    }}catch(error){
      console.log(error);
    }
 }

 useEffect(() => {
  if (items) {
    setName(items.name);
    setStatus(items.status);
  }
}, [items]);



  return (
    <div>
      
      <Modal
        open={openModal}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <h1 className=' text-center font-home text-xl font-semibold mb-4'>Edit Category</h1>
        
        <div
      className=" mx-auto space-y-4 "
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
         <label className=" font-home ">Name of the Inclusion</label>
          <input
            className="shadow appearance-none border rounded font-home  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={name}
            placeholder="Enter Name of the Inclusion"
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
        Edit
      </button>
      </div>
        </Box>
      </Modal>
    </div>
  )
}
