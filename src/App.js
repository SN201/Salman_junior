import './App.css';
import { useState  } from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import ShareLayOut from './pages/ShairLayout';
import { ContextProvider } from './components/Auth';
 //import Register from './pages/Register';
import Profile from './pages/Profile';
//import ChoseDoctor from './pages/ChoseDoctor';
import AdminDashboard from './pages/AdminDashboard';
import ShowReservation from './pages/ShowReservation';
import ReservationDetail from './pages/ReservationDetail';
import Reception from './pages/Reception';
function App() {
  const [user , setUser] = useState('');
  const[key , setKey ] = useState('');
  const [userType , setUserType] = useState(null);
  console.log("accessToken:"+key);
  return (
    <ContextProvider>
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/Salman_junior/' element={<ShareLayOut/>}>
        <Route index element={<Home/>}/>

        {/* Login protect profile / choseDoctor  */}
        <Route path='/Salman_junior/login' element={<Login
        user={user}
        setUser={setUser}
        setKey={setKey}
        userType={userType}
        setUserType={setUserType}
        />}/>
        <Route path='/Salman_junior/profile' element={<Profile
        user={user.username}
        />}/>
        <Route path='/Salman_junior/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/Salman_junior/reception' element={<Reception/>}/>
        {/* DOCTOR */}
        <Route  path='/Salman_junior/showreservation' element={<ShowReservation/>}/>
        <Route path='/Salman_junior/reservation/:id' element={<ReservationDetail/>}/>
        
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
    </ContextProvider>
  );
}

export default App;
