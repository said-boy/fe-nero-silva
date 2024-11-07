import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Mount from "@/components/Mount";
import NeroSilva from "@/components/LogoNeroSilva";
import Sun from "@/components/Sun";
import Cemara from "@/components/Cemara";
import ButterFly from "@/components/ButterFly";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Setup for redirect after animation completion
    if (isMounted) {
      setTimeout(() => {
        navigate("/home"); // Redirect after 4 seconds (assuming your animation duration)
      }, 4000); // Make sure this matches the duration of your animations
    }
  }, [isMounted, navigate]);

  useEffect(() => {
    if (!isMounted) {
      setTimeout(() => {
        setIsMounted(true);
      }, 1500);
    }
  }, [isMounted]);

  return (
    <div className="overflow-hidden">
      {!isMounted && (
        <>
          <div className="overflow-hidden" style={{ height: "100vh" }}>
            <NeroSilva />
            <div className="relative">
              <div className="absolute right-0 top-[15rem] -z-10">
                <Sun />
              </div>
              <div className="scale-125 mt-72">
                <Mount />
              </div>
              <div className="absolute w-full -top-[5rem] scale-150 brightness-50">
                <Cemara />
              </div>
            </div>
          </div>
        </>
      )}

      {isMounted && (
        <>
          <div className="overflow-hidden" style={{ height: "100vh" }}>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 1000 }}
              exit={{ y: 0 }}
              transition={{ duration: 4 }}
              onAnimationComplete={() => setIsMounted(true)}
            >
              <NeroSilva />
            </motion.div>
            <div className="relative">
              <motion.div
                initial={{ top: "15rem", right: "0" }} // Set awal
                animate={{
                  x: [
                    0,
                    -5,
                    -10,
                    -15,
                    -20,
                    -25,
                    -30,
                    -35,
                    -40,
                    -45,
                    -50,
                    -55,
                    -60,
                    -65,
                    -70,
                    -75,
                    -80,
                    -85,
                    -90,
                    -95,
                    -100,
                    -105,
                    -110,
                    -115,
                    -120,
                    -125,
                    -130,
                    -135,
                    -140,
                    -145,
                    -150,
                    -155,
                    -160,
                    -165,
                    -170,
                    -175,
                    -180,
                    -185,
                    -190,
                    -195,
                    -200,
                    -205,
                    -210,
                    -215,
                    -220,
                    -225,
                    -230,
                    -235,
                    -240,
                    -245,
                    -250,
                    -255,
                    -260,
                    -265,
                    -270,
                    -275,
                    -280,
                    -285,
                    -290,
                    -295,
                    -300, // Akhir
                  ],
                  y: [
                    0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -110,
                    -120, -130, -140, -150, -160, -170, -180, -190, -200,
                  ], // Gerakan vertikal
                }}
                transition={{
                  duration: 3.7,
                  ease: "easeInOut",
                  loop: Infinity, // Ulangi animasi
                }}
                className="absolute right-0 top-[35rem] -z-10"
              >
                <Sun />
              </motion.div>
              <motion.div
                initial={{ scale: 1.25 }}
                animate={{ scale: 1, marginTop: ".5px" }}
                exit={{ scale: 1.25 }}
                transition={{ duration: 4 }}
                className=" mt-72"
              >
                <Mount />
              </motion.div>
              <motion.div
                initial={{ scale: 1.5, filter: "brightness(.5)" }}
                animate={{ scale: 1, filter: "brightness(1)", top: "-15rem" }}
                transition={{
                  duration: 3.7,
                  ease: "easeInOut",
                  loop: Infinity, // Ulangi animasi
                }}
                className="absolute w-full -top-[5rem]"
              >
                <Cemara />
              </motion.div>
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "-10rem" }}
                transition={{
                  duration: 3.7,
                  ease: "easeInOut",
                  loop: Infinity, // Ulangi animasi
                }}
                className="absolute -top-[10rem] -left-[5rem]"
              >
                <ButterFly />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
