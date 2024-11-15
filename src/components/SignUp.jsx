import NeroSilvaSingle from "./LogoNeroSilvaSingle";
import NeroSilva from "./LogoNeroSilva";
import { EyeOpen, EyeClose } from "./IconsEyes";
import { useState } from "react";
import { Link } from "react-router-dom";
import NeroSilvaImage from "@/assets/nero-silva.png";


export default function SignUp({ to }) {
  const [open, setOpen] = useState(false);

  function openPassword(e) {
    setOpen(!open);
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
              <h1 className="text-3xl mt-3 font-HelveticaNeueBold opacity-70">Welcome Farmis!</h1>
            </div>

            <div className="flex flex-col w-full items-center">
              <div className="mb-4 w-1/2">
                <label class="block text-[#17181D] opacity-70 mb-3 text-[14px]">
                  Nama Lengkap
                </label>
                <input
                  className="p-2 px-3 block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  type="text"
                  />
              </div>
              <div className="mb-4 w-1/2">
                <label class="block text-[#17181D] opacity-70 mb-3 text-[14px]">
                  Email
                </label>
                <input
                  className="p-2 px-3 block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  type="text"
                  />
              </div>
              
              <div className="mb-14 w-1/2">
                <label class="block text-[#17181D] opacity-70 mb-3 text-[14px]">
                  Password
                </label>
                <div className="flex items-center justify-end">

                <input
                  type={open ? "text" : "password"}
                  id="password"
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
                  class="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.5rem] rounded-[18px] text-white shadow-md"
                  type="submit"
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
