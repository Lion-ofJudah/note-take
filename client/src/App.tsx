import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

function AppTemplate() {
  const location = useLocation();
  const noHeaderPath = ["/login", "/signup"];
  return (
    <>
      {!noHeaderPath.includes(location.pathname) && <Header />}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppTemplate />
    </BrowserRouter>
  );
}
