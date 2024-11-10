import { useState } from "react";
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
import marketplace from "../assets/marketplace.png";
import bgHomeFarm from "../assets/bgHomeFarm.png";

export default function HomePage() {
  const { action } = useParams();

  // State untuk melacak posisi dan ukuran setiap komponen
  const [active, setActive] = useState("b");  // Menggunakan 'b' sebagai komponen default yang aktif
  const [nonActiveProps, setNonActiveProps] = useState({ width: "288px", height: "340px" });
  const [activeProps, setActiveProps] = useState({ width: "343px", height: "423px" });

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
      <div style={{ width, height }} className="bg-white px-5 rounded-[32px] flex flex-col justify-center items-center">
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
      <div style={{ width, height }} className="bg-white rounded-[32px] flex flex-col justify-center items-center">
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
      <div style={{ width, height }} className="w-[${width}] h-[${height}] bg-white rounded-[32px] flex flex-col justify-center items-center">
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

  return (
    <>
      <Background />
      <div className="max-w-screen-xl mx-auto font-HelveticaNeueRoman">
        <div className="relative max-w-screen-xl mx-auto">
          <div className="absolute top-[85vh] left-8 z-20 bg-[#F4F9F4] rounded-xl">
            <Pyramid width={50} />
          </div>
          <div className="absolute shadow-2xl -top-36 left-8 z-20 bg-[#F4F9F4] rounded-xl">
            <NeroSilva width={100} />
          </div>
          <div className="absolute top-6 right-8 z-20 rounded-xl">
            <People width={50} />
          </div>
        </div>
        <div className="relative top-[15vh] flex items-end max-w-screen-xl mx-auto">
          {/* for hidroponic */}
          {action == "hidroponic" ? (
            <>
              <div className="flex px-20 gap-10">
                <div className="flex justify-start">
                  <div>
                    <button className="bg-[#5C8D89] mb-5 flex gap-2 font-bold p-2 text-white rounded-lg">
                      <Leaf /> Hydroponic
                    </button>
                    <span className="text-6xl font-[500]">
                      Solusi <span className="text-[#5C8D89]">Pertanian</span>
                    </span>
                    <br />
                    <span className="text-6xl font-[500]">Masa Depan di</span>
                    <br />
                    <span className="text-6xl font-[500]">Rumah Anda</span>
                    <br />
                    <p className="mt-5 opacity-70">
                      Hidroponik adalah teknik pertanian revolusioner yang
                      memungkinkan tanaman tumbuh lebih cepat, lebih bersih, dan
                      lebih sehat tanpa membutuhkan lahan luas.
                    </p>
                    <br />
                    <p className="mb-5 opacity-70">
                      Pelajari lebih lanjut tentang sistem hidroponik dan mulai
                      menanam hari ini!
                    </p>
                    <Link to={"/home/features"}>
                      <button className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] flex gap-3 font-bold py-2 px-5 text-white rounded-lg shadow-md">
                        Bergabung Sekarang
                        <leaf />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex px-10 gap-10">
                <div>
                  <div className="flex flex-col justify-between align-middle">
                    <div className="relative">
                      <span className="absolute z-10 bg-white p-3 text-[#5C8D89] rounded-xl font-[500] -top-5 -right-20 shadow-md">
                        Kaya Akan vitamin
                      </span>
                      <div className="h-56 w-56 overflow-clip flex items-center justify-start rounded-lg">
                        <Brokoli
                          width={600}
                          className="w-full h-full object-cover -ml-10"
                        />
                      </div>
                      <span className="absolute z-10 bg-[#9747FF] rounded-full p-3 -bottom-10 -left-8">
                        <Pin width="40px" height="40px" />
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-56 w-56 overflow-clip flex items-center justify-start rounded-lg mt-12">
                        <Rectangle />
                      </div>
                      <span className="absolute z-10 bg-white p-3 text-[#5C8D89] rounded-xl font-[500] -bottom-5 -left-20 shadow-md">
                        Tanpa Media Tanah
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center p-1">
                  <span className="absolute z-10 bg-white p-3 text-[#5C8D89] rounded-xl font-[500] top-1/3 -right-16 shadow-md">
                    Sayuran Segar
                  </span>
                  <div className="h-72 w-56 overflow-hidden bg-blue-500 rounded-lg">
                    <Toinane />
                  </div>
                  <span className="absolute z-10 text-[#5C8D89] rounded-xl font-[500] bottom-7 left-16">
                    <Tree width={50} />
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
              <div className="w-full mx-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex gap-10">
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
                        Hydropinic
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
                    <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                      <Market stroke="#5C8D89" />
                      Marketplace
                    </li>
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
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="flex flex-col">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-bold">
                      SERVICE
                    </h1>
                    <h1 className="mt-5 text-[48px] leading-[54px]">
                      Dapatkan fitur yang mempermudah anda.
                    </h1>
                    <button className="mt-24 w-[273px] h-[67px] bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:border hover:border-[#5C8D89] rounded-[14.11px] shadow-lg text-white text-[21.16px] font-bold">
                      Coba Fitur AI Chatbot
                    </button>
                  </div>
                  <div className="w-1/2">
                    <div className="flex w-[900px] relative -inset-x-24 gap-5 items-center -mt-10">
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
              <div className="w-full mx-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex space-x-10">
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
                        Hydropinic
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
                      <Date stroke="#F4F9F4" />
                      Farm
                    </li>
                    <Link to={"/home/market"}>
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Market stroke="#5C8D89" />
                        Marketplace
                      </li>
                    </Link>
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
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-bold">
                      FARM
                    </h1>
                    <h1 className="mt-5 text-[48px] leading-[54px]">
                      Kemudahan dalam Perencanaan Perkebunan Hidroponik.
                    </h1>
                    <button className="mt-16 w-[273px] h-[67px] bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:border hover:border-[#5C8D89] rounded-[14.11px] shadow-lg text-white text-[21.16px] font-bold">
                      Bergabung Sekarang
                    </button>
                  </div>
                  <div className="w-1/2">
                    <div>
                      <img src={bgHomeFarm} alt="BgHomeFarm" className="scale-125 -translate-x-16 -translate-y-14" />
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
              <div className="w-full mx-10">
                {/* list of button */}
                <div className="flex justify-center">
                  <ul className="flex space-x-10">
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
                        Hydropinic
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
                      <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] bg-white text-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                        <Date stroke="#5C8D89" />
                        Farm
                      </li>
                    </Link>
                    <li className="flex gap-2 items-center justify-center text-center w-[179px] h-[57px] text-white bg-[#5C8D89] rounded-[20px] font-HelveticaNeueBold shadow-lg">
                      <Market stroke="#F4F9F4" />
                      Marketplace
                    </li>
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
                  </ul>
                </div>
                {/* end list of button */}
                <div className="flex justify-between overflow-x-clip mt-24 w-full">
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[32px] text-[#5C8D89] tracking-widest font-bold">
                      MARKETPLACE
                    </h1>
                    <h1 className="mt-5 text-[48px] leading-[54px]">
                      Temukan beragam <br/>sayuran dan buah segar <br/>di setiap harinya.
                    </h1>
                    <button className="mt-16 w-[273px] h-[67px] bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:border hover:border-[#5C8D89] rounded-[14.11px] shadow-lg text-white text-[21.16px] font-bold">
                      Dapatkan Sekarang
                    </button>
                  </div>
                  <div className="w-1/2">
                    <div>
                      <img src={bgHomeFarm} alt="BgHomeFarm" className="scale-125 -translate-x-16 -translate-y-14" />
                    </div>
                  </div>
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
