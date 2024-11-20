import NeroSilvaSingle from "./LogoNeroSilvaSingle";
import NeroSilva from "./LogoNeroSilva";
import { EyeOpen, EyeClose } from "./IconsEyes";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NeroSilvaImage from "@/assets/nero-silva.png";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignIn({ to }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  function openPassword(e) {
    setOpen(!open);
  }

  function handleSetEmail(event) {
    setEmail(event.target.value);
  }

  function handleSetPassword(event) {
    setPassword(event.target.value);
  }

  async function submit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(BACKEND_URL + "/login", {
        email: email,
        password: password,
      });

      // Jika berhasil
      Toast.fire({
        icon: res.data.status,
        title: "Login Berhasil",
        text: res.data.message,
      });

      localStorage.setItem("authToken", res.data.token);
      setRedirectToHome(true);
    } catch (error) {
      Toast.fire({
        icon: error.response.data.status,
        title: "Login Gagal",
        text: error.response.data.message,
      });
    }
  }

  // If redirectToHome is true, navigate to "/home"
  if (redirectToHome) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="h-1/6 ps-10 pt-8 z-50">
          <img src={NeroSilvaImage} alt="" width={100} />
        </div>
        <div className="flex justify-center h-5/6 w-full">
          <div className="absolute z-0 h-[80%] -ms-20 -mt-10 w-8/12 bg-[#F4F9F4]/60 py-12 rounded-[20px] shadow-sm"></div>

          <div className="flex z-10 flex-col h-[95%] w-8/12 bg-[#F4F9F4]/90 py-12 rounded-[20px] shadow-sm">
            <div className="flex flex-col items-center mb-8">
              <NeroSilvaSingle />
              <h1 className="text-3xl mt-3 font-HelveticaNeueBold opacity-70">
                Welcome Back!
              </h1>
            </div>

            <div className="flex flex-col w-full items-center">
              <div className="mb-6 w-1/2">
                <label className="block text-[#17181D] opacity-70 mb-3 text-[14px]">
                  Email
                </label>
                <input
                  className="p-2 px-3 block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleSetEmail}
                />
              </div>

              <div className="mb-20 w-1/2">
                <label className="block text-[#17181D] opacity-70 mb-3 text-[14px]">
                  Password
                </label>
                <div className="flex items-center justify-end">
                  <input
                    type={open ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handleSetPassword}
                    className="p-2 px-3 block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  />
                  <button
                    onClick={openPassword}
                    className="absolute flex me-3 items-center justify-center border-black/30 w-8 rounded-md"
                  >
                    {open ? (
                      <EyeOpen width="16px" height="16px" />
                    ) : (
                      <EyeClose width="16px" height="16px" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={submit}
                className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.5rem] rounded-[18px] text-white shadow-md"
              >
                Sign In
              </button>
              <small className="self-center mt-5 text-[14px] font-HelveticaNeueRoman">
                Belum punya akun?{" "}
                <Link to={to} className="text-[#5C8D89]">
                  Sign Up
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
