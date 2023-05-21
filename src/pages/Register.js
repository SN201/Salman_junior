import React,{useState} from 'react'
//import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from '../api/axi';
import { useAuth } from '../components/Auth';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
function Login({setUser,setKey , user}) {
  const[username, setUsername ] = useState('');
  const[password , setPassword ] = useState('');
  const[phone , setPhone ] = useState('');
  const[age , setAge ] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const register = async() => {
    try{
      const response = await axios.post('/auth/registration/',
      JSON.stringify({
        username:username,password:password,phone:phone,age:age
      }),
      {
      headers:{
              'Content-Type': 'application/json',
            }});
    
      setKey(response.data.key);   
      console.log(response);
      setUser({username:username , password:password , phone:phone,age:age});
      auth.login(user);
      navigate('/login');
    }
    catch(err){
      console.log(err);
    }
    if(!username || !password || !phone  ) return
    setUser({username:username , password:password , phone:phone,age:age});
  }
  return (
  
<Wrapper>
  <FormWrapper>
    <Title>Create an account</Title>
    <Input 
    type="text" 
    placeholder="Full Name" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} />
    <Input 
 type="password" 
 placeholder="Password" 
 value={password} 
 onChange={(e) => setPassword(e.target.value)} 
     />
    <Input type="number"
     placeholder="Phone Number"
     value={phone} 
     onChange={(e) => setPhone(e.target.value)}  />
    <Input 
    type="number"
     placeholder="Age"
     value={age} 
     onChange={(e) => setAge(e.target.value)}  />
     <Button  onClick={register} variant="contained">Login</Button>
    <br/>
  </FormWrapper>
</Wrapper>
    
  )
}

export default Login
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const FormWrapper = styled.div`
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
    min-height: auto;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  width: 60%;
  height: 30px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// const Button = styled.button`
//   width: 40%;
//   height: 50px;
//   background-color: #0077FF;
//   color: white;
//   font-size: 1.2rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0066CC;
//   }

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

 




