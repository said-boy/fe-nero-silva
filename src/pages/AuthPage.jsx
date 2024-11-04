import { useParams } from "react-router-dom";
import Background from "../components/Backgournd";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function AuthPage() {
  const { action } = useParams();
  return (
    <>
      <div className="relative">
        <Background />
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
