import { Link } from "react-router-dom";
import { Date, Chat, Home, Market, Seller } from "./IconMenu";

export default function Menu() {
  return (
    <>
      <div className="bg-[#5C8D89] px-5 py-2 rounded-3xl text-white">
        <ul className="flex gap-8">
          <li
            className={`flex flex-col justify-center items-center ${
              location.pathname === "/farm"
                ? "bg-[#74B49B] pt-[8px] pb-[6px] px-[17px] rounded-[24px] -ml-3"
                : ""
            }`}
          >
            <Link to={"/farm"}>
              <Date width="30" height="30" />
              <small className="font-semibold">Farm</small>
            </Link>
          </li>
          <li className="flex flex-col justify-center items-center">
            <Chat width="30" height="30" />
            <small className="font-semibold">Chatbot</small>
          </li>
          <li
            className={`flex flex-col justify-center items-center ${
              location.pathname === "/"
                ? "bg-[#74B49B] pt-[8px] pb-[6px] px-[17px] rounded-[24px]"
                : ""
            }`}
          >
            <Link to={"/"}>
              <Home width="35" height="35" />
              <small className="font-semibold -mt-1">Home</small>
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
      </div>
    </>
  );
}
