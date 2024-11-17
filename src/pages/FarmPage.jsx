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
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [plants, setPlants] = useState(null);
  const [plantSelectedOption, setPlantSelectedOption] = useState("");
  const [countPlant, setCountPlant] = useState(1);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planArray, setPlanArray] = useState({});
  const [events, setEvents] = useState([]);

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
    localStorage.removeItem("authToken");
    setRedirectToLogin(true);
  };

  const handleChangeSelectPlant = (event) => {
    setPlantSelectedOption(event.target.value);
  };

  const handleChangeCountPlant = (event) => {
    setCountPlant(event.target.value);
  };

  async function getPlants(token) {
    try {
      const res = await axios.get(
        BACKEND_URL + "/plant",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Gagal verify token, error:", error);
    }
  }

  function setEventForToday(p) {
    const newEvents = []; // Create a new array to store events
    p.forEach((planItem) => {
      planItem.planting.forEach((plantingItem) => {
        const today = new Date().toISOString().split("T")[0];
        const planDay = new Date(
          new Date(planItem.started_at).setDate(
            new Date(planItem.started_at).getDate() + plantingItem.day
          )
        )
          .toISOString()
          .split("T")[0];

        if (today === planDay) {
          newEvents.push({
            time: plantingItem.timeofday,
            plant: planItem.plant.name,
            title: plantingItem.actifity,
            count: planItem.count,
            date: new Date(
              new Date(planItem.started_at).setDate(
                new Date(planItem.started_at).getDate() + plantingItem.day
              )
            )
              .toISOString()
              .split("T")[0],
          });
        }
      });
    });
    setEvents(newEvents); // Set the events in the state
  }

  useEffect(() => {
    if (token) {
      const verify = async () => {
        const res = await getPlants(token); // Assuming getPlants is an API function
        const planData = await getPlan(verificationData.data.data.id); // Assuming getPlan is another API function

        setPlants(res.data);
        setPlan(planData.data);
        setPlanArray(planData.data.data);
        setEventForToday(planData.data.data); // Call function to update events
        setLoading(false); // Set loading to false once data is fetched
      };
      verify();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function getPlan(id) {
    try {
      const res = await axios.get(
        BACKEND_URL + "/plan/" + id,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Gagal verify token, error:", error);
    }
  }

  async function submit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(BACKEND_URL + "/plan", {
        user_id: verificationData.data.data.id,
        plant_id: plantSelectedOption,
        count: countPlant,
      });
      closeModal();
      setEventForToday(res.data.data);
      return setPlan(res.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
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
                className="border shadow-xl rounded-xl bg-white flex flex-col text-center"
              >
                <p className="py-3 mx-10">{verificationData.data.data.email}</p>
                <Link onClick={logout}>
                  <p className="py-2 hover:bg-red-500 hover:text-white rounded-b-xl">
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-24 w-full px-10">
            <div className="flex gap-[16px] justify-center">
              <div className="grid gap-y-[16px]">
                <h1 className="text-2xl my-3 font-HelveticaNeueBold">GM, {verificationData.data.data.fullname}! 👋</h1>
                <div className="flex gap-[16px] w-full justify-stretch">
                  <div className="bg-white w-[372px] h-[140px] rounded-[20px]">
                    <div className="flex gap-2 items-start h-fitt">
                      <div className="bg-[#428EFF] p-2 flex justify-center items-center rounded-full ml-[23px] mt-2">
                        <Cloud />
                      </div>
                      <span className="opacity-70 text-lg self-center mt-2">
                        Cuaca Hari Ini
                      </span>
                    </div>
                    <div className="flex justify-end pr-10 -mt-3">
                      <Rain />
                    </div>
                  </div>
                  <div className="bg-white w-[372px] h-[140px] rounded-[20px]">
                    <div className="flex gap-2 items-start h-fitt">
                      <div className="bg-[#7367F0] p-2 flex justify-center items-center rounded-full ml-[23px] mt-2">
                        <Leaf />
                      </div>
                      <span className="opacity-70 text-lg self-center mt-2">
                        Informasi
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-end p-10 -mt-3 opacity-70 text-lg leading-5">
                      {events.length > 0
                        ? events.map((item, index) => (
                          <div
                            key={index}
                          >{`Tanaman ${item.plant} ${item.count} tanaman`}</div>
                        ))
                        : "Anda belum mempunyai rencana perkebunan!"}
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
              <div className="bg-white w-[492px] h-fit rounded-[20px] py-3 mb-32 mt-[4.5rem]">
                <div className="flex gap-2">
                  <div className="bg-[#74B49B] p-2 flex justify-center items-center rounded-full ml-[23px] mt-2">
                    <Task />
                  </div>
                  <span className="opacity-70 text-xl self-center mt-2">
                    Kegiatan harian
                  </span>
                </div>
                <div className="bg-[#F4F9F4] m-5 p-5 rounded-[20px]">
                  {events.length > 0 ? (
                    events.map((item, index) => (
                      <div
                        key={index}
                        className="bg-green-100/80 p-5 mb-2 rounded-xl"
                      >
                        <p className="mb-5">{item.time} - {item.plant}</p>
                        <p>{item.title}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="-mt-[10px] opacity-70">
                        Anda belum mempunyai agenda harian!
                      </p>
                      <p className="mt-5 opacity-70">
                        Silahkan tambahkan data perencanaan anda terlebih
                        dahulu, Tekan tombol dan mulai untuk berkebun.
                      </p>
                    </>
                  )}
                  <div className="flex justify-center mt-[55px]">
                    <button
                      className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-lg py-4 px-9 rounded-[20px] text-white shadow-md"
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
          <div className="relative bg-white rounded-[20px] shadow-lg px-9 py-12 w-5/12 h-[89svh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full ]"
            >
              <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <div className="flex items-center justify-start mb-4 gap-2 -mt-3.5">
              <div className="bg-[#74B49B] p-2 rounded-full">
                <Soil />
              </div>
              <h1 className="opacity-70 text-xl self-center font-HelveticaNeueRoman">Rencana Perkebunan</h1>
            </div>
            <form>
              <div className="mb-4 bg-[#F4F9F4] p-8 rounded-[20px]">
                <label className="block text-[#17181D] text-lg opacity-70 mb-2">
                  Jenis Tanaman
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-[#17181D] opacity-60 mb-8 text-xs">
                  Pilih salah satu jenis tanaman yang akan ditanam.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {plants.data.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center text-[#83898C]"
                      htmlFor={item.id}
                    >
                      <input
                        name="tanaman"
                        id={item.id}
                        value={item.id}
                        checked={plantSelectedOption == item.id}
                        onChange={handleChangeSelectPlant}
                        className=" text-green-500"
                        type="radio"
                      />
                      <span className="ml-2">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[#17181D] opacity-70 mb-22">
                  Metode Hidroponik
                  <span className="text-red-500">*</span>
                </label>
                <select className="p-2 appearance-none block w-full h-14 mt-1 placeholder:text-[#17181D] opacity-70 border-2 focus:border-2 border-[#83898C] focus:border-[#00A0FF] rounded-[8px] px-4 shadow-sm bg-white">
                  <option className="text-[#5E6366] h-12" disabled selected>Pilih metode tanam</option>
                  <option className="hover:bg-[#74B49B] text-[#17181D] opacity-70 h-12">Wick System</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-[#17181D] opacity-70">
                  Jumlah Tanaman
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="p-2 px-4 appearance-none block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                  value={countPlant}
                  onChange={handleChangeCountPlant}
                  type="number"
                />
              </div>
              <div className="flex justify-center pt-5">
                <button
                  onClick={submit}
                  className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.2rem] rounded-[18px] text-white shadow-md"
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
