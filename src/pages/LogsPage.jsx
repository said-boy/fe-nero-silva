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
import TableWithPagination from "../components/TableWithPagination";

export default function LogsPage({ verificationData }) {
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
  const [countSuccessPlant, setCountSuccessPlant] = useState('');
  const [countFailedPlant, setCountFailedPlant] = useState('');
  const [plan, setPlan] = useState([]);
  const [planOnly, setPlanOnly] = useState();
  const [loading, setLoading] = useState(true);
  const [planArray, setPlanArray] = useState({});
  const [logs, setLogs] = useState([]);
  const [calculate, setCalculate] = useState({
    succes: 0,
    fail: 0,
  });

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

  const handleChangeCountSuccessPlant = (event) => {
    setCountSuccessPlant(event.target.value);
  };

  const handleChangeCountFailedPlant = (event) => {
    setCountFailedPlant(event.target.value);
  };

  const resetModal = () => {
    setPlantSelectedOption("")
    setCountSuccessPlant("")
    setCountFailedPlant("")
  }

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
        const planOnlyData = await getOnlyPlan(verificationData.data.data.id); // Assuming getPlan is another API function

        const log = await getLog(verificationData.data.data.id)
        const calc = await getCalculate(verificationData.data.data.id)

        setPlants(res.data);
        setPlan(planData.data);
        setPlanArray(planData.data.data);

        setPlanOnly(planOnlyData.data.data)
        setLogs(log.data)

        setCalculate(calc.data.data)
        setLoading(false); // Set loading to false once data is fetched
      };
      verify();
    }
  }, [token, calculate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function getOnlyPlan(id) {
    try {
      const res = await axios.post(
        BACKEND_URL + "/planOnly/" + id,
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

  async function getLog(id) {
    return await axios.get(BACKEND_URL + "/log/" + id);
  }

  async function createLog() {
    const res = await axios.post(BACKEND_URL + "/log/create", {
      user_id: verificationData.data.data.id,
      plan_id: plantSelectedOption,
      succes: countSuccessPlant,
      fail: countFailedPlant
    });
    setLogs(res.data)
  }

  async function getCalculate(user_id) {
    const res = await axios.get(BACKEND_URL + "/log/calculate/" + user_id);
    return res;
  }

  async function submit(event) {
    event.preventDefault();
    try {
      const res = await createLog();
      closeModal();
      resetModal();
      return
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
            <h1 className="text-2xl my-3 font-HelveticaNeueBold">GM, {verificationData.data.data.fullname}! 👋</h1>
            <div className="grid gap-y-[16px]">
              <div className="flex gap-[16px] w-full justify-stretch">
                <div className="bg-white w-1/2 h-[180px] rounded-[20px]">
                  <div className="flex gap-2 items-start h-fitt">
                    <span className="bg-green-500 px-2 text-white border-2 border-green-800 rounded-xl ml-2 opacity-70 text-lg self-center mt-2">
                      Keberhasilan
                    </span>
                  </div>
                  <div className="h-full flex justify-center items-center -mt-8">
                    <h1 className="text-7xl text-center text-green-600 font-extrabold">{calculate.succes ?? 0}%</h1>
                  </div>
                </div>
                <div className="bg-white w-1/2 h-[180px] rounded-[20px]">
                  <div className="flex gap-2 items-start h-fitt">
                    <span className="bg-red-500 px-2 text-white border-2 border-red-800 rounded-xl ml-2 opacity-70 text-lg self-center mt-2">
                      Kegagalan
                    </span>
                  </div>
                  <div className="h-full flex justify-center items-center -mt-8">
                    <h1 className="text-7xl text-center text-red-600 font-extrabold">{calculate.fail ?? 0}%</h1>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white w-full rounded-[20px] mb-32">
                <div className="bg-white ">
                  <div className="flex justify-between">
                    <h1 className="font-bold tracking-widest">Riwayat</h1>
                    <div className="flex gap-2">
                      <button onClick={openModal} className="bg-green-500 py-1 px-2 w-10 h-10 text-center rounded-xl font-bold text-2xl">+</button>
                    </div>
                  </div>
                  <TableWithPagination data={logs} />
                </div>
              </div>
            </div>
          </div>
        </motion.div >
        <motion.div className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2">
          <Menu />
        </motion.div>
      </div >

      {/* Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-[20px] shadow-lg px-9 py-12 w-5/12">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full ]"
              >
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
              <div className="flex items-center justify-start mb-4 gap-2 -mt-3.5">
                <div className="bg-[#74B49B] p-2 rounded-full">
                  <Soil />
                </div>
                <h1 className="opacity-70 text-xl self-center font-HelveticaNeueRoman">Hasil penanaman</h1>
              </div>
              <form>
                <div className="mb-4">
                  <label className="block text-[#17181D] opacity-70 mb-22">
                    Dari Penanaman
                    <span className="text-red-500">*</span>
                  </label>
                  <select onClick={handleChangeSelectPlant} className="p-2 appearance-none block w-full h-14 mt-1 placeholder:text-[#17181D] opacity-70 border-2 focus:border-2 border-[#83898C] focus:border-[#00A0FF] rounded-[8px] px-4 shadow-sm bg-white">
                    <option className="text-[#5E6366] h-12" disabled selected>Pilih metode tanam</option>
                    {plan ? (
                      plan.data.map((item) => (
                        <option key={item.id} value={item.id} className="hover:bg-[#74B49B] text-[#17181D] opacity-70 h-12">
                          [ {new Date(new Date(item.started_at)).toISOString().split("T")[0]} ] {item.plant.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Data tidak tersedia</option>
                    )}
                  </select>
                </div>
                <div className="mb-4 flex gap-2 justify-between">
                  <div className="w-1/2">
                    <label className="block text-[#17181D] opacity-70">
                      Jumlah tanaman berhasil
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="p-2 px-4 appearance-none block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                      value={countSuccessPlant}
                      onChange={handleChangeCountSuccessPlant}
                      type="number"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-[#17181D] opacity-70">
                      Jumlah tanaman gagal
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="p-2 px-4 appearance-none block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                      value={countFailedPlant}
                      onChange={handleChangeCountFailedPlant}
                      type="number"
                    />
                  </div>
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
        )
      }
    </>
  );
}
