import { BrowserRouter, Routes, Route } from "react-router-dom";

import Check from "./pages/Check/Check";
import Login from "./pages/Login/Login";
import Mypage from "./pages/Mypage/Mypage";
import Prescription from "./pages/Prescription/Prescription";
import Signup from "./pages/SignUp/SignUp";
import Taro from "./pages/Taro/Taro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/check" element={<Check />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/taro" element={<Taro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
