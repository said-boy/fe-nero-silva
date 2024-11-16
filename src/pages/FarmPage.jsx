import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/BackgroundFarm";
import NeroSilva from "../components/LogoNeroSilva";
import People from "../components/People";
import Calendar from "../components/Calendar";
import { Cloud, Rain, Task, Soil } from "../components/IconFarm";
import Menu from "../components/Menu";
import Leaf from "../components/Leaf";
import axios from "axios";

export default function FarmPage({ verificationData }) {

  if (!verificationData) {
    return <div>Loading...</div>; // Menunggu data yang dikirim
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // State untuk mengontrol modal
  const token = localStorage.getItem('authToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [plants, setPlants] = useState(null);
  const [plantSelectedOption, setPlantSelectedOption] = useState('');
  const [countPlant, setCountPlant] = useState(1);
  const [plan, setPlan] = useState([]);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk membuka modal
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('authToken')
    setRedirectToLogin(true)
  }

  const handleChangeSelectPlant = (event) => {
    setPlantSelectedOption(event.target.value);
  };

  const handleChangeCountPlant = (event) => {
    setCountPlant(event.target.value);
  };

  async function getPlants(token) {
    try {
      const res = await axios.get(BACKEND_URL + '/plant', {}, {
        headers: {
          'Authorization': token
        }
      });
      return res;
    } catch (error) {
      console.error("Gagal verify token, error:", error);
    }
  }

  useEffect(() => {
    if (token) {
      const verify = async () => {
        const res = await getPlants(token);
        const plan = await getPlan(verificationData.data.data.id)
        setPlants(res.data);
        setPlan(plan.data);
      };
      verify();
    }
  }, [token]);

  async function getPlan(id) {
    try {
      const res = await axios.get(BACKEND_URL + '/plan/' + id, {}, {
        headers: {
          'Authorization': token
        }
      });
      return res;
    } catch (error) {
      console.error("Gagal verify token, error:", error);
    }
  }

  async function submit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(BACKEND_URL + '/plan', {
        user_id: verificationData.data.data.id,
        plant_id: plantSelectedOption,
        count: countPlant
      });
      return res
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim data:', error);
    }
  }

  if (redirectToLogin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Background />
      <div className="relative font-HelveticaNeueRoman max-w-screen-xl mx-auto">
        <motion.div>
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
                className="border shadow-xl rounded-xl bg-white flex flex-col text-center">
                <p className="py-3 mx-10">{verificationData.data.data.email}</p>
                <Link onClick={logout}>
                  <p className="py-2 hover:bg-red-500 hover:text-white rounded-b-xl">Logout</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-24 w-full px-10">
            <div className="flex gap-[16px] justify-center">
              <div className="grid gap-y-[16px]">
                <h1 className="text-2xl my-3 font-bold">GM, {verificationData.data.data.fullname}! 👋</h1>
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
                    <Calendar plan={plan.data} />
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
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-96">
            <button
              onClick={closeModal}
              className="absolute top-0 bg-red-500 right-0 w-10 h-10 rounded-bl-xl rounded-se-lg text-white text-2xl font-bold"
            >
              X
            </button>
            <div className="flex items-center justify-start mb-4 gap-2">
              <div className="bg-[#74B49B] p-[6px] rounded-full mt-2">
                <Soil />
              </div>
              <h1 className="text-xl font-medium mt-1">Rencana Perkebunan</h1>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Jenis Tanaman
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500 mb-2 text-xs">
                  Pilih salah satu jenis tanaman yang akan ditanam.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {plants.data.map(item =>
                    <label className="flex items-center" htmlFor={item.id}>
                      <input name="tanaman" id={item.id}
                        value={item.id}
                        checked={plantSelectedOption == item.id}
                        onChange={handleChangeSelectPlant}
                        className=" text-green-500"
                        type="radio"
                      />
                      <span className="ml-2">{item.name}</span>
                    </label>
                  )}
                </div>
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Metode Hidroponik
                  <span className="text-red-500">*</span>
                </label>
                <select className="border p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-white">
                  <option>Pilih metode tanam</option>
                </select>
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Jumlah Tanaman
                  <span className="text-red-500">*</span>
                </label>
                <input
                  value={countPlant}
                  onChange={handleChangeCountPlant}
                  className="border p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  type="number"
                />
              </div>
              <div className="flex justify-center pt-5">
                <button
                  onClick={submit}
                  className="w-1/2 bg-[#5C8D89] text-white py-2 rounded-lg shadow-md hover:bg-green-600"
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
