import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/home/Home';
import Leagues from 'pages/leagues/Leagues';
import Rankings from 'pages/rankings/Rankings';
import University from 'pages/university/University';
import NavBar from 'components/navBar/Navbar';

// user
import Login from 'pages/user/Login';
import MyPage from 'pages/user/MyPage';
import SingUp from 'pages/user/SignUp';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='background'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/leagues' element={<Leagues />}></Route>
          <Route path='/rankings' element={<Rankings />}></Route>
          <Route path='/university' element={<University />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/mypage' element={<MyPage />}></Route>
          <Route path='/singup' element={<SingUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}
export default App;
