import { Link } from "react-router-dom";
import { Date, Chat, Home, Market, Seller } from "./IconMenu";

export default function Menu() {
  return (
    <>
      <div className="bg-[#5C8D89] px-5 py-1 rounded-3xl text-white">
        <ul className="flex gap-8">
          <li
            className={`flex flex-col  justify-center items-center ${location.pathname === "/farm"
              ? "bg-[#74B49B]  -ml-3.5 -mr-4 my-1 pt-[7px] pb-[6px] px-[15px] rounded-[21px]"
              : ""
              }`}
          >
            <Link to={"/farm"}>
              <div className="-mb-1 flex justify-center">
                <Date width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-xs font-semibold">Farm</small>
              </div>
            </Link>
          </li>
          <li className="flex flex-col justify-center items-center  pt-[8px] pb-[6px]">
            <Chat width="30" height="30" />
            <small className="font-semibold">Chatbot</small>
          </li>
          <li
            className={`flex flex-col justify-center items-center ${location.pathname === "/home"
              ? "bg-[#74B49B] -ml-3 -mr-4 my-1 pt-[7px] pb-[6px] px-[14px] rounded-[21px]"
              : ""
              }`}
          >
            <Link to={"/home"}>
              <div className="-mb-1 flex justify-center">
                <Home width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-xs font-semibold">Home</small>
              </div>
            </Link>
          </li>
          <li className="flex flex-col justify-center items-center">
            <Market width="30" height="30" />
            <small className="font-semibold">Market</small>
          </li>
          <li className="flex flex-col justify-center items-center">
            <Seller width="30" height="30" />
            <small className="font-semibold">Seller</small>
          </li>
        </ul>
      </div >
    </>
  );
}
