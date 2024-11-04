import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="relative overflow-hidden" style={{height:'100vh'}}>
      <motion.div
        initial={{ left: "40px" }}
        animate={{ left: ["40px", "400px", "40px"] }} // Menentukan urutan posisi
        transition={{
          duration: 10, // Durasi total animasi
          ease: "easeInOut",
          repeat: Infinity, // Ulangi animasi
          repeatType: "loop", // Ulangi animasi dengan cara loop
        }}
        className="absolute top-10 left-40 h-96 w-96 bg-[#A7D7C5] rounded-full blur-[400px]"
      ></motion.div>
      <motion.div
        initial={{ right: "224px" }}
        animate={{ right: ["224px", "600px", "224px"] }} // Menentukan urutan posisi
        transition={{
          duration: 10, // Durasi total animasi
          ease: "easeInOut",
          repeat: Infinity, // Ulangi animasi
          repeatType: "loop", // Ulangi animasi dengan cara loop
        }}
        className="absolute top-[450px] right-56 h-96 w-96 bg-[#FF9F43] rounded-full blur-[400px]"
      ></motion.div>
      <motion.div
        initial={{ top: "20px" }}
        animate={{ top: ["20px", "150px", "20px"] }} // Menentukan urutan posisi
        transition={{
          duration: 5, // Durasi total animasi
          ease: "easeInOut",
          repeat: Infinity, // Ulangi animasi
          repeatType: "loop", // Ulangi animasi dengan cara loop
        }}
        className="absolute top-5 right-28 h-96 w-96 bg-[#7367F0] rounded-full blur-[400px]"
      ></motion.div>
    </div>
  );
}
