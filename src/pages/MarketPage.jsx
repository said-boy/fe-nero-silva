import { motion } from "framer-motion";
import Background from "../components/BackgroundFarm";
import Menu from "../components/Menu";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";
import NeroSilvaSingle from "../components/LogoNeroSilvaSingle";

export default function MarketPage() {
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
                        <div className="h-5/6 w-full flex justify-center items-center">
                            {/* Animasi dengan Framer Motion */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            >
                                {/* Roket Terbang Secara Vertikal (Dari Bawah ke Atas) */}
                                <motion.div
                                    className="mb-4"
                                    initial={{ y: 100 }} // Mulai dari bawah (off-screen)
                                    animate={{ y: -30 }} // Bergerak ke posisi tengah
                                    transition={{
                                        duration: 1,
                                        type: "spring",
                                        delay: 0.3,
                                    }}
                                >
                                    <NeroSilvaSingle width={70} />
                                </motion.div>

                                {/* Teks yang Muncul Setelah Roket */}
                                <motion.h2
                                    className="text-4xl font-bold text-gray-800 mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 2.3 }}
                                >
                                    Something amazing is coming soon!
                                </motion.h2>
                                <motion.p
                                    className="text-xl text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 3.3 }}
                                >
                                    Stay tuned as we are preparing something big for you!
                                </motion.p>
                            </motion.div>
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
