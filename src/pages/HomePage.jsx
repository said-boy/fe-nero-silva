import { useState } from "react";
import { motion } from "framer-motion";
import LandingPage from "../components/LandingPage";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";
import Background from "../components/Backgournd";
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
  const [animate, setAnimate] = useState(true);
  return (
    <>
      <div className="relative overflow-hidden">
        {animate ? (
          <div>
            <LandingPage onAnimationComplete={() => setAnimate(false)} />
          </div>
        ) : (
          <>
            <motion.div
              initial={{filter: 'blur(10px)'}}
              animate={{ bottom: -700 }}
              transition={{ duration: 1 }}
              className="absolute"
            >
              <Before />
            </motion.div>
            <motion.div>
              <Background />
              <div className="absolute shadow-2xl -top-36 left-8 z-20 bg-[#F4F9F4] rounded-xl">
                <NeroSilva width={80} />
              </div>
              <div className="absolute top-6 right-8 z-20 rounded-xl">
                <People width={50} />
              </div>
              <div className="absolute shadow-2xl -bottom-0 left-8 z-20 bg-[#F4F9F4] rounded-xl">
                <Pyramid width={50} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-10 justify-between w-[100vw] px-24">
                  <motion.div
                    initial={{ marginTop: "300px" }}
                    animate={{ marginTop: "40px" }}
                    transition={{ duration: 1.5 }}
                    className="mt-10 w-1/2"
                  >
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
                    <p className="mt-5">
                      Hidroponik adalah teknik pertanian revolusioner yang
                      memungkinkan tanaman tumbuh lebih cepat, lebih bersih, dan
                      lebih sehat tanpa membutuhkan lahan luas.
                    </p>
                    <br />
                    <p className="mb-5">
                      Pelajari lebih lanjut tentang sistem hidroponik dan mulai
                      menanam hari ini!
                    </p>
                    <button className="bg-[#5C8D89] flex gap-3 font-bold py-2 px-5 text-white rounded-lg shadow-md">
                      Bergabung Sekarang
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ marginRight: "-300px" }}
                    animate={{ marginRight: "0px" }}
                    transition={{ duration: 1.5 }}
                    className="flex gap-5"
                  >
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
                        <span className="absolute z-10 bg-white p-3 text-[#5C8D89] rounded-xl font-[500] bottom-16 -left-20 shadow-md">
                          Tanpa Media Tanah
                        </span>
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
                  </motion.div>
                </div>
              </div>
              <motion.div
              initial={{ marginBottom: "-90px" }}
              animate={{ marginBottom: "-5px" }}
              transition={{ duration: 2 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <Menu />
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}
