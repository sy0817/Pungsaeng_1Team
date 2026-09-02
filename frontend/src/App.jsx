import { BrowserRouter, Routes, Route } from "react-router-dom";

import Check from "./pages/Check";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import Prescription from "./pages/Prescription";
import Signup from "./pages/Signup";
import Taro from "./pages/Taro";

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
