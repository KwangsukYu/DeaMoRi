import './App.css';
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
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Leagues' element={<Leagues/>}></Route>
          <Route path='/Rankings' element={<Rankings/>}></Route>
          <Route path='/University' element={<University/>}></Route>
          
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/MyPage' element={<MyPage/>}></Route>
          <Route path='/SingUp' element={<SingUp/>}></Route>
        </Routes>
      </BrowserRouter>

  );
}
export default App;
