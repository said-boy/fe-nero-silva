import { useState } from "react";
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

export default function HomePage() {
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
                <button className="bg-[#5C8D89] flex gap-3 font-bold py-2 px-5 text-white rounded-lg shadow-md">
                  Bergabung Sekarang
                </button>
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
        </div>
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <Menu />
        </div>
      </div>
    </>
  );
}
