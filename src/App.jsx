import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import FarmPage from "./pages/FarmPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
          <Route path="/home" Component={HomePage}></Route>
          <Route path="/auth">
            <Route index element={<Navigate to="/auth/signin" />} />
            <Route path=":action" element={<AuthPage />} />
          </Route>
          <Route path="/farm" Component={FarmPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
