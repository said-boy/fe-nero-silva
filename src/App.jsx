import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/auth">
            <Route index element={<Navigate to="/auth/signin" />} />
            <Route path=":action" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
