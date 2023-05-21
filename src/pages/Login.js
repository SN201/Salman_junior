import React,{useState,useEffect} from 'react'
//import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../api/axi';
import { useAuth } from '../components/Auth';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import jwt_decode from 'jwt-decode'
import ParticBack from '../components/ParticBack';
function Login({setUser, user,userType,setUserType}) {
  const[username, setUsername ] = useState('');
  const[password , setPassword ] = useState('');
  const [access,setAccess] =useState('')
  const [refresh,setRefresh] =useState('')
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(access ,refresh );
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      auth.setAuth({ username, password, accessToken });
      console.log(access);
    }
  },);

  const login = async () => {
    try {
      const response = await axios.post(
        '/login/',
        JSON.stringify({
          username: username,
          password: password
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      const access_token = response.data.access;
      const refresh_token = response.data.refresh;
      setAccess(access_token);
      setRefresh(refresh_token);
      Cookies.set('access_token', access_token);
      Cookies.set('refresh_token', refresh_token);
       console.log('Access token:', access_token);
    console.log('Refresh token:', refresh_token);
      const type = response.data.type;
      if (type === 'patient') {
        navigate('/login'); // Redirect to an error page
        alert("You Can Login Just From App ")
        return;
      }
      // setUserType(type);
      auth.type(type);
      auth.login(user);
      auth.authToken(access_token);
      auth.username(response.data.name);
      auth.userPhone(response.data.phone);
      auth.Gender(response.data.sex);
      auth.doctorSpecialty(response.data.specialty);
      console.log(response.data);
      navigate('/');
      setUser({ username, password });
    } catch (err) {
      console.log(err);
      return;
    }
  
    if (!username || !password) return;
  
    const intervalId = setInterval(async () => {
      const access_token = Cookies.get('access_token');
      const refresh_token = Cookies.get('refresh_token');
      if (!access_token || !refresh_token) return;
  
      const tokenExpirationTime = jwt_decode(access_token).exp;
      const currentTime = Date.now() / 1000;
      if (currentTime > tokenExpirationTime) {
        try {
          const refreshResponse = await axios.post(
            'https://hospitalamjad.pythonanywhere.com/refresh/',
            JSON.stringify({
              refresh: refresh_token,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          const newAccess = refreshResponse.data.access;
          setAccess(newAccess);
          Cookies.set('access_token', newAccess);
          console.log('New access token:', newAccess);
        } catch (err) {
          console.log(err);
          clearInterval(intervalId);
          navigate("/login")
          auth.logout();
        }
      }
    }, 10000);

  };
    
  return (

<>
<ParticBack/>
<div>
<Wrapper>

  <FormWrapper>
    <Title>Login</Title>
    <Input 
    type="text" 
    placeholder="UserName" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} />
      <Input 
    type="password" 
    placeholder="Password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} />
    <B>
    <Button  onClick={login} variant="contained">Login</Button>
    </B>
    {/* <br/>
    <Link to='/register'>Resgister</Link>
    <br/> */}
  </FormWrapper>
</Wrapper>
</div>
</>

    
  )
}

export default Login
const Wrapper = styled.div`
z-index:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  //background: url("/photo/cool-background.png") center center /cover no-repeat ;
`;

const FormWrapper = styled.div`
z-index:1;
a{
  text-decoration: none;
  color: black;
  font-weight: 600;
}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 500px;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 90%;

    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
z-index:1;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: palegoldenrod;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// const Input = styled.input`
// z-index:1;
//   width: 60%;
//   height: 30px;
//   margin-bottom: 1rem;
//   padding: 0.5rem;
//   font-size: 1.2rem;
//   border-radius: 5px;
//   border: none;
//   box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;
const Input = styled.input`
  z-index: 1;
  width: 60%;
  height: 30px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.8);
  transition: box-shadow 0.2s ease-in-out;

  &:hover:not(:focus),
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px palegoldenrod;
    border: none;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

 const B = styled(Button)`
 .MuiButton-contained {
  background-color: palegoldenrod;
 }`
// const Button = styled(button)`
//   // width: 40%;
//   // height: 50px;
//   // background-color: #0077FF;
//   // color: white;
//   // font-size: 1.2rem;
//   // border: none;
//   // border-radius: 5px;
//   // cursor: pointer;

//   // &:hover {
//   //   background-color: #0066CC;
//   // }

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;