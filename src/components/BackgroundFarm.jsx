import { motion } from "framer-motion";

export default function BackgroundFarm() {
  return (
    <div
      className="bg-[#F4F9F4] fixed top-0 left-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }} // Agar background tidak menghalangi interaksi dengan konten lainnya
    >
      <motion.div
        initial={{ left: "40px" }}
        animate={{ left: ["40px", "400px", "40px"] }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-10 left-40 h-[40rem] w-[40rem] bg-[#A7D7C5] rounded-full blur-[1500px] opacity-70"
      ></motion.div>
      <motion.div
        initial={{ right: "224px" }}
        animate={{ right: ["224px", "800px", "224px"], top: ["450px", "450px", "0px", "450px"], }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-[450px] right-56 h-[30rem] w-[30rem] bg-[#FF9F43] rounded-full blur-[1500px] opacity-70"
      ></motion.div>
      <motion.div
        initial={{ top: "20px" }}
        animate={{ top: ["20px", "150px", "20px"] }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-5 right-28 h-[30rem] w-[30rem] bg-[#7367F0] rounded-full blur-[1500px] opacity-70"
      ></motion.div>
    </div>
  );
}
