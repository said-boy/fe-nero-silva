import { useParams } from "react-router-dom";
import Background from "../components/Backgournd";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function AuthPage() {
  const { action } = useParams();
  return (
    <>
      <div className="absolute w-screen h-screen">
        <Background />
      </div>
        {action === "signin" ? (
          <div className="w-full top-0">
            <SignIn to={"/auth/signup"} />
          </div>
        ) : (
          <div className="w-full top-0">
            <SignUp to={"/auth/signin"} />
          </div>
        )}
    </>
  );
}
