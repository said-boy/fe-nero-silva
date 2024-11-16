import NeroSilvaSingle from "./LogoNeroSilvaSingle";
import NeroSilva from "./LogoNeroSilva";
import { EyeOpen, EyeClose } from "./IconsEyes";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NeroSilvaImage from "@/assets/nero-silva.png";
import axios from "axios";

export default function SignUp({ to }) {
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function openPassword(e) {
    setOpen(!open);
  }

  function handleSetFullname(event) {
    setFullname(event.target.value);
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
      const res = await axios.post(BACKEND_URL + "/register", {
        fullname: fullname,
        email: email,
        password: password,
      });

      if (res.data.status === "success") {
        localStorage.setItem("authToken", res.data.token);
        setRedirectToHome(true);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }
  }

  // If redirectToHome is true, navigate to "/home"
  if (redirectToHome) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="h-1/6 ps-10 pt-8">
          <img src={NeroSilvaImage} alt="" width={100} />
        </div>
        <div className="flex justify-center h-5/6 w-full">
          <div className="absolute z-0 h-[80%] -ms-20 -mt-10 w-8/12 bg-[#F4F9F4]/60 py-12 rounded-[20px] shadow-sm"></div>

          <div className="flex z-10 flex-col h-[95%] w-8/12 bg-[#F4F9F4]/90 py-6 rounded-[20px] shadow-sm">
            <div className="flex flex-col items-center mb-8">
              <NeroSilvaSingle />
              <h1 className="text-3xl mt-3 font-HelveticaNeueBold opacity-70">
                Welcome Farmis!
              </h1>
            </div>

            <div className="flex flex-col w-full items-center">
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="namalengkap"
                  class="block text-[#17181D] opacity-70 mb-3 text-[14px]"
                >
                  Nama Lengkap
                </label>
                <input
                  className="p-2 px-3 block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  type="text"
                  id="namalengkap"
                  value={fullname}
                  onChange={handleSetFullname}
                />
              </div>
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="email"
                  class="block text-[#17181D] opacity-70 mb-3 text-[14px]"
                >
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

              <div className="mb-14 w-1/2">
                <label
                  htmlFor="password"
                  class="block text-[#17181D] opacity-70 mb-3 text-[14px]"
                >
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
                Sign Up
              </button>
              <small className="self-center mt-5 text-[14px] font-HelveticaNeueRoman">
                Sudah memiliki akun?{" "}
                <Link to={to} className="text-[#5C8D89]">
                  Sign In
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
