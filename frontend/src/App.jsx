import { BrowserRouter, Routes, Route } from "react-router-dom";

import Check from "./pages/Check/Check";
import Login from "./pages/Login/Login";
import Mypage from "./pages/Mypage/Mypage";
import Prescription from "./pages/Prescription/Prescription";
import Signup from "./pages/SignUp/SignUp";
import Taro from "./pages/Taro/Taro";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 없이 볼 수 있는 페이지 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 로그인해야 볼 수 있는 페이지 (RequireAuth 로 감싸기) */}
        <Route path="/check" element={<RequireAuth><Check /></RequireAuth>} />
        <Route path="/taro" element={<RequireAuth><Taro /></RequireAuth>} />
        <Route path="/prescription" element={<RequireAuth><Prescription /></RequireAuth>} />
        <Route path="/prescription/:prescriptionId" element={<RequireAuth><Prescription /></RequireAuth>} />
        <Route path="/mypage" element={<RequireAuth><Mypage /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
