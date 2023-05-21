import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './Auth';
import styled from 'styled-components';
//import salman from'../../public/photo/22.svg';
function Navbar() {
    const auth = useAuth();
    const a = auth.userType;
    console.log(a);
  return (
    <Header>
          {/* IF NO USER  */}
        <Logo src='/Logo/logo.png' alt='2'/>
        <HeaderMenu>
        <NavLink to='/'>
  <span>Home</span>
  </NavLink>
        {auth?.user === null && (
    <NavLink to='/login'>
       <span>Login</span>
    </NavLink>
  )}
    {/* START  OF ADMIN  */}
{/* IF ADMIN LOGIN */}
     {auth?.user !== null  && a === "doctor" && (
    <NavLink to='/showreservation'>
   <span>ShowPatient</span>
   </NavLink>
  )}
  {/* END OF ADMIN  */}
   {/* START  OF Reception  */}
  {auth?.user !== null  && a === "reception" && (
    <NavLink to='/reception'>
   <span>checkAcount</span>
   </NavLink>
  )}
   {/* End  OF Reception  */}
   {/* START  OF DOCTOR  */}

    {/* doctor SHOW Paitient */}
   {auth?.user !== null  && a === "admin" && (
    <NavLink to='/AdminDashboard'>
   <span>AdminDashboard</span>
   </NavLink>
  )}
{/* End  OF DOCTOR  */}

        </HeaderMenu>
        {/* IF USER LOGIN */}
        {auth?.user !== null && a === "doctor" && (
     <NavLink to='/profile'>
    <UserImage
              src={auth.gender === 'male' ? "/Images/kisspng-computer-icons-avatar-clip-art-sales-person-5b187a2cad18b2.600745161528330796709.png" : "/Images/kisspng-computer-icons-symbol-icon-design-woman-avatar-5b26f901289e31.2337261715292807691664.png"}
              gender={auth.gender}/>
   </NavLink> 
  )}
     {/* IF USER reception */}
     {auth?.user !== null && a === "reception" && (
     <NavLink to='/profile'>
    <UserImage
              src={auth.gender === 'male' ? "/Images/kisspng-computer-icons-avatar-clip-art-sales-person-5b187a2cad18b2.600745161528330796709.png" : "/Images/kisspng-computer-icons-symbol-icon-design-woman-avatar-5b26f901289e31.2337261715292807691664.png"}
              gender={auth.gender}/>
   </NavLink> 
  )}
    {/* Admin Profile */}
    {auth?.user !== null  && a === "admin" && (
    <NavLink to='/profile'>
    <UserImage 
              src={auth.gender === 'male' ? "/Images/kisspng-computer-icons-avatar-clip-art-sales-person-5b187a2cad18b2.600745161528330796709.png" : "/Images/kisspng-avatar-computer-icons-employers-5adee1aa013f97.4762672515245562020051.png"}
              gender={auth.gender}/>
   </NavLink>
  )}
    </Header>
  )
}

export default Navbar
const Header = styled.div`
z-index:1;
height: 70px;
//background-color:#090b13;
//background-color:#9CC9DC;
// background-color:skyblue;
background-image: linear-gradient( white,#247179 );
color:white;
display: flex;
align-items: center;
padding: 0 36px;
z-index:0;
overflow-x:hidden;
`
const Logo = styled.img` 
width:75px;
`
const HeaderMenu = styled.div`
display: flex;
flex:1;
margin-left : 25px;
align-items: center;
a{
text-decoration: none;
  display: flex;
  align-items: center;
  padding:0 12px;
  cursor:pointer;
  color:white;
  img{
    height:20px;
  }
  span{
    font-size:13px;
    letter-spacing :1.42px;
    position: relative;
  }
  span:after{
    content:'';
    background: white;
    height:2px;
    width:100%;
    position: absolute;
    left:0;
    right:0;
    bottom:-6px;
    opacity: 0;
    transform-origin: left center;
    transform: scaleX(0);
    transition:all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s ; 
  }
  &:hover{
    span:after{
    opacity: 1;
    transform: scaleX(1);
    // transition: 0.6s;
  }}
  }

`
const UserImage = styled.img`
width:60px;
height:60px;
border-radius:50%;
cursor:pointer;
transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
    z-index: 1;
  }
`



