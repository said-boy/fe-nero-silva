import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import LandingPage from "./LandingPage";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";
import Background from "../components/BackgroundFarm";
import Leaf from "../components/Leaf";
import Pyramid from "../components/Pyramid";
import Brokoli from "../components/Brokoli";
import { Pin } from "../components/IconPin";
import Rectangle from "../components/Rectangle";
import Toinane from "../components/Toinane";
import Tree from "../components/Tree";
import Before from "../components/Before";
import Menu from "../components/Menu";
import { Date, Market } from "../components/IconMenu";
import booking from "../assets/booking.png";
import ai from "../assets/ai.png";
import bghomemarketplace from "../assets/market.png";
import marketplace from "../assets/marketplace.png";
import bgHomeFarm from "../assets/farm.png";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function verifyToken(token) {
  try {
    const res = await axios.post(BACKEND_URL + '/verify', {}, {
      headers: {
        'Authorization': token
      }
    });
    return res;
  } catch (error) {
    console.error("Gagal verify token, error:", error);
  }
}

export default function HomePage() {
  const { action } = useParams();
  const token = localStorage.getItem('authToken');

  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsLoading(false); // Jika token tidak ada, langsung set loading selesai
        return;
      }

      try {
        const data = await verifyToken(token); // Panggil fungsi verifyToken
        setVerificationData(data); // Simpan hasil verifikasi
      } catch (error) {
        console.error("Verifikasi gagal:", error);
      } finally {
        setIsLoading(false); // Pastikan loading selesai
      }
    };

    verify(); // Jalankan fungsi verify
  }, [token]);



  // State untuk melacak posisi dan ukuran setiap komponen
  const [active, setActive] = useState("b");  // Menggunakan 'b' sebagai komponen default yang aktif
  const [nonActiveProps, setNonActiveProps] = useState({ width: "288px", height: "340px" });
  const [activeProps, setActiveProps] = useState({ width: "343px", height: "423px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setRedirectToLogin(true);
  };

  // State untuk melacak urutan setiap komponen
  const [order, setOrder] = useState({ a: 0, b: 1, c: 2 });

  // Fungsi untuk menangani klik pada tombol dan menukar atribut serta order
  const handleButtonClick = (clickedComponent) => {
    // Jika yang diklik adalah komponen dengan order 1, tidak melakukan perubahan
    if (order[clickedComponent] === 1) return;

    // Set active komponen setelah order diperbarui
    setActive(clickedComponent);

    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      const clickedOrder = prevOrder[clickedComponent];

      // Rotasi maju atau mundur berdasarkan urutan yang diklik
      if (clickedOrder === 0) {
        newOrder.a = (prevOrder.a + 1) % 3;
        newOrder.b = (prevOrder.b + 1) % 3;
        newOrder.c = (prevOrder.c + 1) % 3;
      } else if (clickedOrder === 2) {
        newOrder.a = (prevOrder.a + 2) % 3;
        newOrder.b = (prevOrder.b + 2) % 3;
        newOrder.c = (prevOrder.c + 2) % 3;
      }

      return newOrder;
    });

  };

  const A = ({ width, height }) => {
    return (
      <div style={{ width, height }} className="bg-white shadow-md px-5 rounded-[32px] flex flex-col justify-center items-center">
        <img
          src={booking}
          alt="Booking Image"
          className="mb-16"
        />
        <h1 className="text-[28px] leading-8 px-5 text-center">
          Membantu Penanaman
        </h1>
        <motion.span
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5
          }}
          className={`${active === 'a' ? '' : 'hidden'} text-center opacity-70 mx-14 mt-10`}>Membantu anda dalam proses menanam tanaman Hidroponik.</motion.span>
      </div>
    );
  }

  const B = ({ width, height }) => {
    return (
      <div style={{ width, height }} className="bg-white shadow-md rounded-[32px] flex flex-col justify-center items-center">
        <img
          src={ai}
          alt="Booking Image"
          className="mb-14"
        />
        <h1 className="text-[28px] mx-16 px-3 leading-8 text-center">
          Dibantu dengan AI
        </h1>
        <motion.span
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5
          }}
          className={`${active === 'b' ? '' : 'hidden'} text-center opacity-70 px-5 mx-14 mt-10`}>AI yang membantu anda dalam menyelesaikan permasalahan saat proses menanam.</motion.span>
      </div>
    )
  }

  const C = ({ width, height }) => {
    return (
      <div style={{ width, height }} className="w-[${width}] h-[${height}] bg-white shadow-md rounded-[32px] flex flex-col justify-center items-center">
        <img
          src={marketplace}
          alt="Marketplace Image"
          className="mb-16"
        />
        <h1 className="text-[28px] px-3 text-center">
          Marketplace
        </h1>
        <motion.span
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5
          }}
          className={`${active === 'c' ? '' : 'hidden'} text-center opacity-70 px-4 mx-14 mt-10`}>Menyediakan tempat untuk ada menjual maupun membeli sayuran hidroponik.</motion.span>
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Background />
      <div className="max-w-screen-xl mx-auto h-screen font-HelveticaNeueRoman overflow-hidden">
        <div className="relative max-w-screen-xl mx-auto">
          <div className="absolute top-[85vh] z-0 left-8 bg-[#F4F9F4] rounded-xl">
            {/* <Pyramid width={50} /> */}
          </div>
          <div className="absolute shadow-2xl -top-36 left-8 z-20 bg-[#F4F9F4] rounded-xl">
            <NeroSilva width={100} />
          </div>
          <div className="absolute top-6 right-8 z-20 rounded-xl">
            <div className="flex flex-col items-end">
              <button onClick={openMenu}>
                <People width={50} />
              </button>
              <div
                style={isMenuOpen ? { display: "block" } : { display: "none" }}
                className="border shadow-xl rounded-xl bg-white flex flex-col text-center"
              >
                <p className="py-3 mx-10">{verificationData != null ? verificationData.data.data.email : 'Hello Guest'}</p>
                {verificationData != null ? (
                  <Link onClick={logout}>
                    <p className="py-2 hover:bg-red-500 hover:text-white rounded-b-xl">
                      Logout
                    </p>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <p className="py-2 hover:bg-[#5C8D89] hover:text-white rounded-b-xl">
                      Login
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative top-[15vh] flex items-end max-w-screen-xl mx-auto">
          {/* for hidroponic */}
          {action == "hidroponic" ? (
            <>
              <div className="flex px-20 gap-10">
                <div className="flex justify-start">
                  <div className="mt-5">
                    <button className="bg-[#5C8D89] mb-8 flex gap-2 font-HelveticaNeueRoman tracking-wider text-[16px] py-4 px-6 text-white rounded-[20px]">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 21C7 21 7.5 16.5 11 12.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> Hydroponic
                    </button>
                    <span className="text-6xl font-[500] opacity-70 font-HelveticaNeueBold">
                      Solusi
                    </span>
                    <span className="text-[#5C8D89] text-6xl font-[500] font-HelveticaNeueBold"> Pertanian</span>
                    <br />
                    <span className="text-6xl font-[500] opacity-70 font-HelveticaNeueBold">Masa Depan di</span>
                    <br />
                    <span className="text-6xl font-[500] opacity-70 font-HelveticaNeueBold">Rumah Anda</span>
                    <br />
                    <p className="mt-8 opacity-70">
                      Hidroponik adalah teknik pertanian revolusioner yang <br />
                      memungkinkan tanaman tumbuh lebih cepat, lebih bersih, <br />
                      dan lebih sehat tanpa membutuhkan lahan luas.
                    </p>
                    <br />
                    <p className="mb-6 opacity-70">
                      Pelajari lebih lanjut tentang sistem hidroponik dan mulai
                      menanam hari ini!
                    </p>
                    <Link to={"/home/features"}>
                      <button className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-6 rounded-[20px] text-white shadow-md">
                        Bergabung Sekarang
                        <Leaf />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex px-10 gap-10">
                <div>
                  <div className="flex flex-col justify-between align-middle">
                    <div className="relative">
                      <span className="absolute z-10 bg-white py-3 px-5 font-HelveticaNeueRoman text-[#5C8D89] rounded-xl -top-5 -right-[110px] shadow-md">
                        Kaya Akan vitamin
                      </span>
                      <div className="h-56 w-56 overflow-clip flex items-center justify-start rounded-lg shadow-md shadow-slate-300">
                        <Brokoli
                          width={600}
                          className="w-full h-full object-cover -ml-10"
                        />
                      </div>
                      <span className="absolute z-10 bg-[#9747FF] rounded-full p-4 -bottom-10 -left-8 shadow-md">
                        <Pin width="36px" height="36px" />
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-56 w-56 overflow-clip flex items-center justify-start rounded-lg mt-12 shadow-md shadow-slate-300">
                        <Rectangle />
                      </div>
                      <span className="absolute z-0 bg-white py-3 px-5 font-HelveticaNeueRoman text-[#5C8D89] rounded-xl font-[500] -bottom-5 -left-20 shadow-md">
                        Tanpa Media Tanah
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center p-1">
                  <span className="absolute z-10 bg-white py-3 px-5 font-HelveticaNeueRoman text-[#5C8D89] rounded-xl font-[500] top-1/3 -right-12 shadow-md">
                    Sayuran Segar
                  </span>
                  <div className="h-72 w-56 overflow-hidden bg-blue-500 rounded-lg shadow-md shadow-slate-300">
                    <Toinane />
                  </div>
                  <span className="absolute z-10 bg-[#FF9F43] rounded-full p-4 bottom-4 left-8 shadow-md">
                    <svg width="36px" height="36px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M12 22L12 14M12 10L12 14M12 14L16 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18H7.5C4.46243 18 2 15.5376 2 12.5C2 9.46243 4.46243 7 7.5 7H9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18H16.5C19.5376 18 22 15.5376 22 12.5C22 9.63102 19.8033 7.27508 17 7.02246" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {/* end of hidroponic */}

          {action == "features" ? (
            <>
              <div className="w-full ps-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex justify-evenly w-full">
                    <Link to={"/home"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 21C7 21 7.5 16.5 11 12.5"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Hydroponic
                      </li>
                    </Link>
                    <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] text-white bg-[#5C8D89] rounded-[20px] font-bold shadow-lg">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5 15L5.5 15"
                          stroke="#F4F9F4"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 4L8 4"
                          stroke="#F4F9F4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                          stroke="#F4F9F4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 9.01L12.01 8.99889"
                          stroke="#F4F9F4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 2.01L11.01 1.99889"
                          stroke="#F4F9F4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Features
                    </li>
                    <Link to={"/home/farm"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Date stroke="#5C8D89" />
                        Farm
                      </li>
                    </Link>
                    <Link to={"/home/market"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Market stroke="#5C8D89" />
                        Marketplace
                      </li>
                    </Link>
                    <Link to={"/home/join"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 20V19C2 15.134 5.13401 12 9 12V12"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15.3633 17L16.4542 18.0909L18.636 15.9091"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Join Now
                      </li>
                    </Link>
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="px-10">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-HelveticaNeueBold">
                      SERVICE
                    </h1>
                    <h1 className="mt-5 text-[42px] leading-[54px] font-HelveticaNeueBold opacity-70">
                      Dapatkan fitur yang mempermudah anda.
                    </h1>
                    <button className="bg-[#5C8D89] mt-24 w-fitt hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-6 rounded-[20px] text-white shadow-md">
                      Coba Fitur AI Chatbot
                    </button>
                  </div>
                  <div className="w-1/2 ">
                    <div className="flex relative -inset-x-24 gap-5 items-center -mt-10">
                      <button
                        key={`a-${order.a}`} // `key` unik agar React menganggap ini sebagai elemen baru saat order berubah
                        onClick={() => handleButtonClick("a")}
                        style={{ order: order.a }}
                      >
                        <A {...(active === "a" ? activeProps : nonActiveProps)} />
                      </button>
                      <button
                        key={`b-${order.b}`} // `key` unik agar React menganggap ini sebagai elemen baru saat order berubah
                        onClick={() => handleButtonClick("b")}
                        style={{ order: order.b }}
                      >
                        <B {...(active === "b" ? activeProps : nonActiveProps)} />
                      </button>
                      <button
                        key={`c-${order.c}`} // `key` unik agar React menganggap ini sebagai elemen baru saat order berubah
                        onClick={() => handleButtonClick("c")}
                        style={{ order: order.c }}
                      >
                        <C {...(active === "c" ? activeProps : nonActiveProps)} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {action == "farm" ? (
            <>
              <div className="w-full ps-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex justify-evenly w-full">
                    <Link to={"/home"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 21C7 21 7.5 16.5 11 12.5"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Hydroponic
                      </li>
                    </Link>
                    <Link to={"/home/features"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-bold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.5 15L5.5 15"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 4L8 4"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9.01L12.01 8.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 2.01L11.01 1.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Features
                      </li>
                    </Link>
                    <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] text-white bg-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                      <Date stroke="#ffffff" />
                      Farm
                    </li>
                    <Link to={"/home/market"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Market stroke="#5C8D89" />
                        Marketplace
                      </li>
                    </Link>
                    <Link to={"/home/join"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 20V19C2 15.134 5.13401 12 9 12V12"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15.3633 17L16.4542 18.0909L18.636 15.9091"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Join Now
                      </li>
                    </Link>
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="px-10 w-1/2">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-HelveticaNeueBold">
                      FARM
                    </h1>
                    <h1 className="mt-5 text-[42px] leading-[54px] font-HelveticaNeueBold opacity-70">
                      Kemudahan dalam Perencanaan Perkebunan Hidroponik.
                    </h1>
                    <button className="bg-[#5C8D89] mt-24 w-fitt hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-6 rounded-[20px] text-white shadow-md">
                      Bergabung Sekarang
                    </button>
                  </div>
                  <div className="w-1/2 mt-20">
                    <div>
                      <img src={bgHomeFarm} alt="BgHomeFarm" className="scale-[1.5] translate-x-20 -translate-y-16" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {action == "market" ? (
            <>
              <div className="w-full ps-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex justify-evenly w-full">
                    <Link to={"/home"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 21C7 21 7.5 16.5 11 12.5"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Hydroponic
                      </li>
                    </Link>
                    <Link to={"/home/features"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-bold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.5 15L5.5 15"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 4L8 4"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9.01L12.01 8.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 2.01L11.01 1.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Features
                      </li>
                    </Link>
                    <Link to={"/home/farm"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px]  bg-white text-[#5C8D89]  rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Date stroke="#5C8D89" />
                        Farm
                      </li>
                    </Link>
                    <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] text-white bg-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                      <Market stroke="#ffffff" />
                      Marketplace
                    </li>
                    <Link to={"/home/join"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 20V19C2 15.134 5.13401 12 9 12V12"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15.3633 17L16.4542 18.0909L18.636 15.9091"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Join Now
                      </li>
                    </Link>
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="px-10 w-1/2">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-HelveticaNeueBold">
                      MARKETPLACE
                    </h1>
                    <h1 className="mt-5 text-[42px] leading-[54px] font-HelveticaNeueBold opacity-70">
                      Temukan beragam <br />sayuran dan buah segar <br />di setiap harinya.
                    </h1>
                    <button className="bg-[#5C8D89] mt-24 w-fitt hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-6 rounded-[20px] text-white shadow-md">
                      Dapatkan Sekarang
                    </button>
                  </div>
                  <div className="w-1/2 -mt-12">
                    <div>
                      <img src={bghomemarketplace} alt="BgHomeFarm" className="scale-[0.9] translate-x- -translate-y-16" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {action == "join" ? (
            <>
              <div className="w-full ps-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex justify-evenly w-full">
                    <Link to={"/home"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 21C7 21 7.5 16.5 11 12.5"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z"
                            stroke="#5C8D89"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Hydroponic
                      </li>
                    </Link>
                    <Link to={"/home/features"}>
                      <li className="flex gap-1 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-bold shadow-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.5 15L5.5 15"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 4L8 4"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9.01L12.01 8.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 2.01L11.01 1.99889"
                            stroke="#5C8D89"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Features
                      </li>
                    </Link>
                    <Link to={"/home/farm"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px]  bg-white text-[#5C8D89]  rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Date stroke="#5C8D89" />
                        Farm
                      </li>
                    </Link>
                    <Link to={"/home/market"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px]  bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Market stroke="#5C8D89" />
                        Marketplace
                      </li>
                    </Link>
                    <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] text-white bg-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 20V19C2 15.134 5.13401 12 9 12V12"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15.3633 17L16.4542 18.0909L18.636 15.9091"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Join Now
                    </li>
                  </ul>
                </div>
                {/* end list of button */}
                <div className="h-screen pb-28 w-full pe-10">
                  <div className="w-full flex justify-center h-4/6 pt-12">
                    <div className="w-1/3">
                      <div className="ps-12 pb-14 w-full grid content-end justify-items-start h-1/2">
                        <span className="bg-[#A7D7C5]/30 text-center text-xl text-[#5C8D89] leading-[54px] font-HelveticaNeueBold rounded-2xl border-2 border-black/20 shadow-sm px-6 py-1 shadow-md">
                          Menanam lebih efisien
                        </span>
                      </div>
                      <div className="pt-3 w-full grid content-start justify-items-end h-1/2">
                        <span className="bg-[#A7D7C5]/30 text-center text-xl text-[#5C8D89] leading-[54px] font-HelveticaNeueBold rounded-2xl border-2 border-black/20 shadow-sm px-6 py-1 shadow-md">
                          Tanam tanpa batas
                        </span>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex w-full h-1/2 items-end justify-center">
                        <span className="bg-[#A7D7C5]/50 text-center text-[36px] leading-[54px] font-HelveticaNeueBold opacity-70 rounded-2xl border-2 border-black/20 shadow-sm p-3">
                          JADILAH BAGIAN<br />
                          DARI KOMUNITAS<br />
                          HIDROPONIK KAMI!
                        </span>
                      </div>
                      <div className="flex w-full h-1/2 items-start justify-center">
                        <button className="bg-[#5C8D89] mt-20 w-fitt hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-6 rounded-[20px] text-white shadow-md">
                          Bergabung Sekarang
                        </button>
                      </div>
                    </div>
                    <div className="w-1/3 ">
                      <div className="ps-12 pb-16 w-full grid content-end justify-items-start h-1/2">
                        <span className="bg-[#A7D7C5]/30 text-center text-xl text-[#5C8D89] leading-[54px] font-HelveticaNeueBold rounded-2xl border-2 border-black/20 shadow-sm px-6 py-1 shadow-md">
                          Ayo tanam hidroponik!
                        </span>
                      </div>
                      <div className="pt-3 pe-1 w-full grid content-start justify-items-end h-1/2">
                        <span className="bg-[#A7D7C5]/30 text-center text-xl text-[#5C8D89] leading-[54px] font-HelveticaNeueBold rounded-2xl border-2 border-black/20 shadow-sm px-6 py-1 shadow-md">
                          Tanam tanpa tanah
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed bottom-0 bg-[#17181D] h-44 w-full left-1/2 -translate-x-1/2">
                <div className="h-5/6 w-full bg-[#17181D] flex justify-between">
                  <div className="w-1/4 h-full">
                    <div className="h-1/3 px-4 flex items-end">
                      <span className="font-HelveticaNeueBold text-[14px] tracking-wider leading-5 text-white">
                        Nero Silva
                      </span>
                    </div>
                    <div className="h-2/3 px-4 flex items-center">
                      <span className="font-HelveticaNeueRoman text-[12px] tracking-wider leading-4 text-white">
                        Nero Silva, platform yang menyediakan <br />
                        informasi dan panduan untuk memulai <br />
                        serta mengembangkan kebun hidroponik <br />
                        di lahan terbatas.
                      </span>
                    </div>
                  </div>
                  <div className="w-1/6 h-full">
                    <div className="h-1/3 px-4 flex items-end">
                      <span className="font-HelveticaNeueBold text-[14px] tracking-wider leading-5 text-white">
                        Contact Us
                      </span>
                    </div>
                    <div className="h-2/3 px-4 flex flex-col justify-end gap-2 pb-2">
                      <span className="font-HelveticaNeueRoman text-[12px] tracking-wider leading-5 flex gap-2 text-white">
                        <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        +62 898 0492 345
                      </span>
                      <span className="font-HelveticaNeueRoman text-[12px] tracking-wider leading-5 flex gap-2 text-white">
                        <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        +62 853 2557 2459
                      </span>
                      <span className="font-HelveticaNeueRoman text-[12px] tracking-wider leading-5 flex ps-6 gap-2 text-white">
                        <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M14 12L10.5 14V10L14 12Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z" stroke="#ffffff" strokeWidth="1.5"></path></svg>

                        <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#ffffff" strokeWidth="1.5"></path><path d="M17.5 6.51L17.51 6.49889" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                        <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-1/6 w-full bg-black flex items-center px-4 justify-between">
                  <span className="font-HelveticaNeueRoman text-[10px] tracking-wider text-white">Click Me:v</span>
                  <span className="font-HelveticaNeueRoman text-[10px] tracking-wider text-white">&copy; Nero Silva, 2024. All rights reserved.</span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

        </div>
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <Menu />
      </div>
    </>
  );
}
