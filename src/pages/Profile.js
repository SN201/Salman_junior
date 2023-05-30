import React from 'react'
import styled from 'styled-components';
import { useAuth } from '../components/Auth';
import { Link  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
function UserPage({user}) {
  // const navigate = useNavigate();
  const auth = useAuth();
  const handelLogout = ()=>{
auth.logout();
  };
  
  return (
    <ProfileSection>
       
        {auth.user !== null && (
          <>
        <ProfileContainer>
        <ProfilePicture
     
              src={auth.gender === 'male' ? "../Images/kisspng-computer-icons-avatar-clip-art-sales-person-5b187a2cad18b2.600745161528330796709.svg" : "../Images/kisspng-computer-icons-symbol-icon-design-woman-avatar-5b26f901289e31.2337261715292807691664.svg"}
              gender={auth.gender}
            />
      <Name>{auth.userType}</Name>
      <Name>{auth.name}</Name>
      <ContactInfo>
        <h2>Contact Information</h2>
        <p>Phone: {auth.phone}</p>
        {auth.userType=== 'doctor'?
        <p>Specialty: {auth.specialty}</p>:null}
      </ContactInfo>
      <B>
      <Button  onClick={handelLogout} variant="contained">
      <A><Link to='/'>LogOut 
      {/* { navigate('/login') } */}
      </Link></A>
      </Button> 
      </B>
      
    
       
    </ProfileContainer>
        </>
        )}
    </ProfileSection>
  )
}

export default UserPage;
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #F0F0F0;
//   padding: 30px;
// `;

// const ProfilePicture = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   margin-top: 50px;
//   transition: transform 0.2s ease-in-out;
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const Name = styled.h1`
//   font-size: 32px;
//   margin-top: 30px;
//   font-weight: bold;
//   color: #1C1C1C;
// `;

// // const Email = styled.p`
// //   font-size: 20px;
// //   margin-top: 10px;
// //   color: #666666;
// // `;

// // const HospitalName = styled.p`
// //   font-size: 20px;
// //   margin-top: 10px;
// //   color: #666666;
// // `;

// // const Bio = styled.div`
// //   font-size: 18px;
// //   margin-top: 30px;
// //   text-align: center;
// //   display: flex;
// //   flex-wrap: wrap;
// //   justify-content: center;
// //   padding: 20px;
// // `;

// const ContactInfo = styled.div`
//   margin-top: 50px;
//   h2 {
//     font-size: 24px;
//     font-weight: bold;
//     color: #1C1C1C;
//   }
//   p {
//     font-size: 20px;
//     margin-top: 10px;
//     color: #666666;
//   }
// `;

// const MedicalInfo = styled.div`
//   margin-top: 50px;
//   h2 {
//     font-size: 24px;
//     font-weight: bold;
//     color: #1C1C1C;
//   }
//   p {
//     font-size: 20px;
//     margin-top: 10px;
//     color: #666666;
//   }
// `
const A = styled.div`
a{
  text-decoration: none;
  color:black;
}
`

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient( rgb(36, 113, 121),white);
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:20px
  // background-color: #fff;
  padding: 20px;
  justify-content: center;s
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 80%;
  max-height: 700px;
  overflow-y: auto;
  width: 67%;
  max-width: 500px;
  transform: translateY(10%);
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
  text-align: center;
  
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;
const B = styled(Button)`
 .MuiButton-contained {
  background-color: palegoldenrod;
 }`
// const MedicalInfo = styled.div`
//   text-align: center;
  
//   h2 {
//     font-size: 20px;
//     font-weight: bold;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 16px;
//     margin: 5px 0;
//   }
// `;

// const LogoutButton = styled.button`
//   background-color: #ff6b6b;
//   color: #fff;
//   font-size: 16px;
//   font-weight: bold;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   margin-top: 20px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #ff4d4d;
//   }
// `;