import NeroSilvaSingle from "./LogoNeroSilvaSingle";
import NeroSilva from "./LogoNeroSilva";
import { EyeOpen, EyeClose } from "./IconsEyes";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function SignUp({ to }) {
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
      const res = await axios.post(BACKEND_URL + '/register', {
        fullname: fullname,
        email: email,
        password: password
      });

      if (res.data.status === 'success') {
        localStorage.setItem('authToken', res.data.token)
        setRedirectToHome(true);
      }

    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim data:', error);
    }
  }

  // If redirectToHome is true, navigate to "/home"
  if (redirectToHome) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <div className="relative">
        <div className="absolute z-30 w-20 -top-36 left-8 bg-red-400">
          <NeroSilva />
        </div>
        <div className="absolute top-10 left-[410px] z-20 bg-[#f2f3f2] rounded-xl">
          <div className="w-[30rem] h-[80vh] p-5 flex justify-center"></div>
        </div>
        <div className="absolute shadow-2xl top-20 left-[450px] z-20 bg-[#F4F9F4] rounded-xl">
          <div className="pt-12 text-center">
            <NeroSilvaSingle />
            <h1 className="text-3xl">Welcome Farmis!</h1>
          </div>
          <div className="w-[30rem] h-[60vh] px-28 pt-10 flex flex-col">
            <label htmlFor="namalengkap" className="text-xs">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namalengkap"
              value={fullname}
              onChange={handleSetFullname}
              className="pl-2 rounded-md mt-1 h-8 border border-black/30"
            />
            <label htmlFor="email" className="text-xs mt-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleSetEmail}
              className="pl-2 rounded-md mt-1 h-8 border border-black/30"
            />
            <label htmlFor="password" className="text-xs mt-3">
              Password
            </label>
            <div className="flex items-center relative">
              <input
                type={open ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleSetPassword}
                className="pl-2 rounded-md w-full mt-1 h-8 border border-black/30"
              />
              <button
                type="button"
                onClick={openPassword}
                className="absolute right-0 flex mt-1 items-center justify-center border-black/30 w-8 rounded-md"
              >
                {open ? (
                  <EyeOpen width="15px" height="15px" />
                ) : (
                  <EyeClose width="15px" height="15px" />
                )}
              </button>
            </div>
            <button
              onClick={submit}
              className="mt-8 p-2 rounded-md shadow-md font-bold w-40 self-center text-white bg-[#5C8D89]">
              Sign Up
            </button>
            <small className="self-center mt-5 text-xs">
              Sudah memiliki akun?{" "}
              <Link to={to} className="text-[#5C8D89] font-bold">
                Sign In
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
