import { Link } from "react-router-dom";
import { Date, Chat, Home, Market, Seller, Logs } from "./IconMenu";

export default function Menu() {
  return (
    <>
      <div className="bg-[#5C8D89] -mb-2 w-fitt h-[76px] py-2 px-2 rounded-[32px] flex justify-center text-white">
        <ul className="flex gap-3 items-center w-full justify-evenly ">
          <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/farm")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/farm"}>
              <div className="-mb-1 flex justify-center">
                <Date width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Farm</small>
              </div>
            </Link>
          </li>
          {/* <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/chatbot")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/chatbot"}>
              <div className="-mb-1 flex justify-center">
                <Chat width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Chatbot</small>
              </div>
            </Link>
          </li> */}
          <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/home")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/home"}>
              <div className="-mb-1 flex justify-center">
                <Home width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Home</small>
              </div>
            </Link>
          </li>
          <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/logs")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/logs"}>
              <div className="-mb-1 flex justify-center">
                <Logs width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Logs</small>
              </div>
            </Link>
          </li>
          {/* <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/market")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/market"}>
              <div className="-mb-1 flex justify-center">
                <Market width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Market</small>
              </div>
            </Link>
          </li> */}
          {/* <li
            className={`w-[72px] rounded-[24px] px-[16px] py-[10px] ${location.pathname.startsWith("/seller")
              ? "bg-[#74B49B]"
              : ""
              }`}
          >
            <Link to={"/seller"}>
              <div className="-mb-1 flex justify-center">
                <Seller width="30" height="30" />
              </div>
              <div className="-mb-1 text-center">
                <small className="text-[0.65rem] tracking-wider font-HelveticaNeueBold">Seller</small>
              </div>
            </Link>
          </li> */}
        </ul>
      </div >
    </>
  );
}
