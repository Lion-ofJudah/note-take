import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import ProtectRoute from "./components/ProtectRoute";

function AppTemplate() {
  return (
    <Routes>
      <Route
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
      </Route>
      <Route path={"/login"} element={<LogIn />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppTemplate />
    </BrowserRouter>
  );
}
