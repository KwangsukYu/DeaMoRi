import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Leagues from "pages/leagues/Leagues";
import Rankings from "pages/rankings/Rankings";
import University from "pages/university/University";
import NavBar from "components/navBar/Navbar";

// user
import Login from "pages/user/Login";
import MyPage from "pages/user/MyPage";
import SingUp from "pages/user/SignUp";
import Edit from "pages/user/Edit";
import CreateRoom from "pages/live/CreateRoom";
import LivePage from "pages/live//LivePage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="background">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/leagues" element={<Leagues />}></Route>
          <Route path="/rankings" element={<Rankings />}></Route>
          <Route path="/university" element={<University />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/signup" element={<SingUp />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/createroom/:id" element={<CreateRoom />}></Route>
          <Route path="/live/:title" element={<LivePage />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/leagues" element={<Leagues />} />
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
