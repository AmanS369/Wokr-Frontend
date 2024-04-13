// Login.jsx
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../Components/LoadingButton.jsx";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const register_response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response was successful (status code 2xx)
      if (register_response.ok) {
        const responseData = await register_response.json();
        toast.success(responseData.message);
      } else {
        const errorData = await register_response.json();
        console.log("ERROR", errorData);
        toast.error(errorData.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          {/* <div>
        <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png" className="w-32 mx-auto" />
      </div> */}
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    required
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    required
                    placeholder="Confrim Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />

                  <LoadingButton loading={loading}>Register</LoadingButton>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Workr
                    <a
                      href="/"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="/"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
