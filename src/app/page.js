"use client";
import Image from "next/image";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

export default function Home() {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    user_name: "",
    password: "",
  });

  const router = useRouter();
  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    if (user_name === "") newErrors.user_name = "Enter valid email";
    if (password.length < 5 || !alphaNumericRegex.test(password)) {
      newErrors.password = "Enter valid password";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const response = await fetch("https://next-travel-backend-vercel.vercel.app/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_name,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success === true) {
        localStorage.setItem("token", json.token);
        router.push("/dashboard");
      } else {
        setErrormsg(json.msg);
        setOpen(true);
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert severity="error">{errormsg}</Alert>
      </Snackbar>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          src={"/gd logo.gif"}
          style={{ margin: "10px", cursor: "pointer" }}
          height={150}
          width={150}
          unoptimized
        ></Image>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your username"
                  value={user_name}
                  onChange={(e) => {
                    setUser_name(e.target.value);
                    setErrors({ ...errors, user_name: "" });
                  }}
                />
                {errors.user_name ? (
                  <p className=" text-red-600 text-xs font-home m-0 p-0">
                    User name is required
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                />
                {errors.password ? (
                  <p className=" text-red-600 text-xs font-home m-0 p-0">
                    Password shoud be atleast 5 character long
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-between">
            
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full  text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
