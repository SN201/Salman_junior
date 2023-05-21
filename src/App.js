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
      <Route path='/' element={<ShareLayOut/>}>
        <Route index element={<Home/>}/>

        {/* Login protect profile / choseDoctor  */}
        <Route path='/login' element={<Login
        user={user}
        setUser={setUser}
        setKey={setKey}
        userType={userType}
        setUserType={setUserType}
        />}/>
        <Route path='/profile' element={<Profile
        user={user.username}
        />}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/reception' element={<Reception/>}/>
        {/* DOCTOR */}
        <Route  path='/showreservation' element={<ShowReservation/>}/>
        <Route path='/reservation/:id' element={<ReservationDetail/>}/>
        
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
    </ContextProvider>
  );
}

export default App;
