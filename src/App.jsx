import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import FarmPage from "./pages/FarmPage";
import LandingPage from "./pages/LandingPage";
import ChatbotPage from "./pages/ChatbotPage";
import MarketPage from "./pages/MarketPage";
import SellerPage from "./pages/SellerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
          <Route path="/home">
            <Route index element={<Navigate to="/home/hidroponic" />} />
            <Route path=":action" element={<HomePage />} />
          </Route>
          <Route path="/auth">
            <Route index element={<Navigate to="/auth/signin" />} />
            <Route path=":action" element={<AuthPage />} />
          </Route>
          <Route path="/farm" Component={FarmPage}></Route>
          <Route path="/chatbot" Component={ChatbotPage}></Route>
          <Route path="/market" Component={MarketPage}></Route>
          <Route path="/seller" Component={SellerPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
