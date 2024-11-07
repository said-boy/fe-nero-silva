import { useState } from "react";
import { motion } from "framer-motion";
import Background from "../components/BackgroundFarm";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";
import Calendar from "../components/Calendar";
import { Cloud, Rain, Task, Soil } from "../components/IconFarm";
import Menu from "../components/Menu";
import Leaf from "../components/Leaf";

export default function FarmPage() {
  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Background />
      <div className="relative font-HelveticaNeueRoman max-w-screen-xl mx-auto">
        <motion.div>
          <div className="absolute shadow-2xl -top-36 left-8 z-20 bg-[#F4F9F4] rounded-xl">
            <NeroSilva width={100} />
          </div>
          <div className="absolute top-6 right-8 z-20 rounded-xl">
            <People width={50} />
          </div>
          <div className="absolute top-24 w-full px-10">
            <div className="flex gap-[16px] justify-center">
              <div className="grid gap-y-[16px]">
                <h1 className="text-2xl my-3 font-bold">GM, Rizby! 👋</h1>
                <div className="flex gap-[16px]">
                  <div className="bg-white w-[373px] h-[160px] rounded-[20px]">
                    <div className="flex gap-1">
                      <div className="bg-[#428EFF] p-[6px] rounded-full ml-[23px] mt-2">
                        <Cloud />
                      </div>
                      <span className="opacity-70 text-xl self-end">
                        Cuaca Hari Ini
                      </span>
                    </div>
                    <div className="flex justify-end pr-10 -mt-3">
                      <Rain />
                    </div>
                  </div>
                  <div className="bg-white w-[373px] h-[160px] rounded-[20px]">
                    <div className="flex gap-1">
                      <div className="bg-[#7367F0] p-[6px] rounded-full ml-[23px] mt-2">
                        <Leaf />
                      </div>
                      <span className="opacity-70 text-xl self-end">
                        Informasi
                      </span>
                    </div>
                    <div className="flex justify-end p-10 -mt-3 opacity-70 text-lg leading-5">
                      Anda belum mempunyai rencana perkebunan!
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white w-[760px] rounded-[20px] mb-32">
                  <div className="bg-white ">
                    <Calendar />
                  </div>
                </div>
              </div>
              <div className="w-1 bg-white mt-[4.5rem] mb-32"> </div>
              <div className="bg-white w-[492px] rounded-[20px] p-4 mb-32 mt-[4.5rem]">
                <div className="flex gap-1">
                  <div className="bg-[#74B49B] p-[6px] rounded-full ml-[23px] mt-2">
                    <Task />
                  </div>
                  <span className="opacity-70 text-xl self-end">
                    Kegiatan harian
                  </span>
                </div>
                <div className="bg-[#F4F9F4] m-5 p-10 rounded-[20px]">
                  <p className="-mt-[10px] opacity-70">
                    Anda belum mempunyai agenda harian!
                  </p>
                  <p className="mt-5 opacity-70">
                    Silahkan tambahkan data perencanaan anda terlebih dahulu,
                    Tekan tombol dan mulai untuk berkebun.
                  </p>
                  <div className="flex justify-center mt-[55px]">
                    <button
                      className="shadow-lg w-[242px] h-[67px] bg-[#5C8D89] rounded-[14.11px] text-white text-xl font-bold"
                      onClick={openModal} // Memanggil fungsi openModal untuk membuka modal
                    >
                      Mulai Berkebun
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2">
          <Menu />
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="relative bg-white rounded-lg shadow-lg p-8 w-96">
            <button
              onClick={closeModal}
              className="absolute top-0 bg-red-500 right-0 w-10 h-10 rounded-bl-xl rounded-se-lg text-white text-2xl font-bold"
            >
              X
            </button>
            <div class="flex items-center justify-start mb-4 gap-2">
              <div className="bg-[#74B49B] p-[6px] rounded-full mt-2">
                <Soil />
              </div>
              <h1 class="text-xl font-medium mt-1">Rencana Perkebunan</h1>
            </div>
            <form>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">
                  Jenis Tanaman
                  <span class="text-red-500">*</span>
                </label>
                <p class="text-gray-500 mb-2 text-xs">
                  Pilih salah satu jenis tanaman yang akan ditanam.
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Selada</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Kangkung</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Sawi</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Tomat</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Bayam</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      class="form-checkbox text-green-500"
                      type="checkbox"
                    />
                    <span class="ml-2">Strawberi</span>
                  </label>
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">
                  Metode Hidroponik
                  <span class="text-red-500">*</span>
                </label>
                <select class="border p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-white">
                  <option>Pilih metode tanam</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">
                  Jumlah Tanaman
                  <span class="text-red-500">*</span>
                </label>
                <input
                  class="border p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  type="number"
                />
              </div>
              <div className="flex justify-center pt-5">
                <button
                  class="w-1/2 bg-[#5C8D89] text-white py-2 rounded-lg shadow-md hover:bg-green-600"
                  type="submit"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
