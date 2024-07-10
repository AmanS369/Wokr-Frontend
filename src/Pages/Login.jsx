import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Slices/authSlice.js";
import LoadingButton from "../Components/LoadingButton.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.reducer.user.isAuthenticated,
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem("redirectPath") || "/user/home";
      console.log(redirectPath);
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginResponse = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (loginResponse.ok) {
        const responseData = await loginResponse.json();
        toast.success(responseData.message);

        // Dispatch the login action
        dispatch(
          login({
            user: responseData.user,
            token: responseData.token,
          }),
        );

        // Redirect to the originally requested page or the default home page
        const redirectPath =
          localStorage.getItem("redirectPath") || "/user/home";
        console.log(redirectPath);
        // localStorage.removeItem("redirectPath");
        navigate(redirectPath, { replace: true });
      } else {
        const errorData = await loginResponse.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error(error);
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
            <h1 className="text-2xl xl:text-3xl font-extrabold">Log In</h1>
            <form onSubmit={handlelogin}>
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
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

                  <LoadingButton loading={loading}>Login</LoadingButton>
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

export default Login;
