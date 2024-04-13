import { useState } from "react";

import useQuery from "../Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingButton from "../Components/LoadingButton.jsx";

const ResetPassword = () => {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState([]);
  const [cpassword, setCpassword] = useState([]);
  const navigate = useNavigate();
  const reset_token = query.get("token");
  console.log(reset_token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password == cpassword) {
        const { data } = await fetch(
          `/api/v1/auth/reset_password/${reset_token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          }
        );
        if (data?.success) {
          toast.success(data.message);
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Password Mismatch");
        console.log("password mis");
      }
    } catch (e) {
      toast.error("Something went Wrong");
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
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Confirm Password"
                    required
                    name="Confirmpassword"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />

                  <LoadingButton loading={loading}>
                    Reset Password{" "}
                  </LoadingButton>
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

export default ResetPassword;
