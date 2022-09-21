import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Leagues from "pages/leagues/Leagues";
import Rankings from "pages/rankings/Rankings";
import University from "pages/university/University";
import NavBar from "components/navBar/Navbar";

// user
import Login from "pages/user/Login";
import MyPage from "pages/user/mypage/MyPage";
import SingUp from "pages/user/SignUp";
import Edit from "pages/user/Edit";
import LeagueDetail from "pages/leagues/detail/LeagueDetail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/detail/:id" element={<LeagueDetail />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/university" element={<University />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
