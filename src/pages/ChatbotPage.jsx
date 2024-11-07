import { motion } from "framer-motion";
import Background from "../components/BackgroundFarm";
import Menu from "../components/Menu";
import gemini from "../assets/Google Ai Gemini.png";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";

export default function ChatbotPage() {
  return (
    <>
      <Background />
      <div className="relative pt-5 font-HelveticaNeueRoman max-w-screen-xl mx-auto">
        <div>
          <div className="absolute shadow-2xl -top-36 left-8 z-20 bg-[#F4F9F4] rounded-xl">
            <NeroSilva width={100} />
          </div>
          <div className="absolute top-6 right-8 z-20 rounded-xl">
            <People width={50} />
          </div>
        </div>
      </div>
      <div className="h-screen font-HelveticaNeueRoman max-w-screen-xl mx-auto flex justify-center items-center">
        <div className="w-[1080px] h-[520px] bg-[#F4F9F4] opacity-60 absolute z-0 me-20 mb-20 rounded-2xl"></div>
        <div className="w-[1080px] h-[520px] bg-[#F4F9F4] z-10 rounded-2xl">
          <div className="p-8 h-full">
            <div className="h-5/6 w-full flex justify-center ms-8 flex-col">
              <h1 className="text-[3rem] font-HelveticaNeueBold bg-gradient-to-r from-[#0757D0] via-[#42B3FF] to-[#28C76F] bg-clip-text inline-block text-transparent">
                Tanya Seputar Hidroponik
              </h1>
              <div className="flex">
                <h2 className="text-[2.75rem] font-HelveticaNeueBold mt-2 opacity-35">
                  With
                </h2>
                <img className="w-[180px] -mt-6" src={gemini} alt="" />
              </div>
            </div>
            <div className="h-1/6 flex justify-center items-center">
              <div className="w-[700px] bg-white h-[52px] rounded-full flex">
                <div className="w-[700px] flex h-[52px] items-center">
                  <input
                    className="text-gray-500 bg-[#17181D]/5 font-HelveticaNeueRoman w-[652px] h-[52px] rounded-full px-8 focus:outline-none focus:border-0 focus:ring-0"
                    placeholder="Tulis Pertanyaan Anda"
                    type="text"
                  />
                  <button className="w-11 h-11 bg-gray-500 rounded-full bg-gray-500 me-1 flex justify-center items-center">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#ffffff"
                    >
                      <path
                        d="M22.1525 3.55321L11.1772 21.0044L9.50686 12.4078L2.00002 7.89795L22.1525 3.55321Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9.45557 12.4436L22.1524 3.55321"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2">
        <Menu />
      </motion.div>
    </>
  );
}
