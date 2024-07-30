import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import ProtectRoute from "./components/ProtectRoute";

function AppTemplate() {
  const location = useLocation();
  const headerPath = ["/profile", "/"];
  return (
    <>
      {headerPath.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<ProtectRoute />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />
        </Route>
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"*"} element={<PageNotFound />} />
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
