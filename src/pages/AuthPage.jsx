import { useParams } from "react-router-dom";
import Background from "../components/BackgroundFarm";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function AuthPage() {
  const { action } = useParams();
  return (
    <>
      <Background />
      <div className="relative pt-5 font-HelveticaNeueRoman max-w-screen-xl mx-auto">
        {action === "signin" ? (
          <div className="absolute top-0">
            <SignIn to={"/auth/signup"} />
          </div>
        ) : (
          <div className="absolute top-0">
            <SignUp to={"/auth/signin"} />
          </div>
        )}
      </div>
    </>
  );
}
