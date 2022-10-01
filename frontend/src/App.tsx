import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rankings from "pages/rankings/Rankings";
import NavBar from "components/navBar/Navbar";
import Landing from "pages/LandingPage/Landing";

// University
import UniList from "pages/university/UniList";
import University from "pages/university/University";

// Leagues
import Leagues from "pages/leagues/Leagues";
import Create from "pages/leagues/create/Create";
import LeagueDetail from "pages/leagues/detail/LeagueDetail";

// user
import Login from "pages/user/Login";
import MyPage from "pages/user/mypage/MyPage";
import SingUp from "pages/user/SignUp";
import Edit from "pages/user/Edit";
import LivePage from "pages/live/LivePage";
import CreateRoom from "pages/live/CreateRoom";

// admin
import Admin from "pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="background">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/create" element={<Create />} />
          <Route path="/leagues/detail/:leagueId" element={<LeagueDetail />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/university" element={<UniList />} />
          <Route path="/university/:id" element={<University />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/live/broadcast:title" element={<LivePage />} />
          <Route path="/createroom/:id" element={<CreateRoom />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
