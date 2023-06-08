import React from 'react'
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home() {

 return (<>
<HomeContainer>
  <ImageSlider/>
    </HomeContainer>
    <Services/>
    <ServicesGrid />
    <ContactUs/>
    <ContactGrid/>
    <Footer/>
    {/* <ContactForm/> */}
    </>
    
  )
}

export default Home

//Home Section 
const HomeContainer = styled.div`
  /* Add your styles here */
  // background-color:#035274;
   //background-color:#509EC0;
   background-image: linear-gradient(#247179, #1E8181 );
  overflow-x:hidden;
  min-height:calc(84vmin - 70px);
  padding: 0 calc(3.5vw + 5px); //how the fuck he do this calac !!!!!!
  position:relative;
  margin: 0 auto; /* Center the container horizontally */
  &:before{
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
  bottom:0;
  z-index:-1;

    @media (max-width: 768px) {
      padding: 0 calc(1.5vw + 5px);
`;

//Services Section 
const Services=()=>{
  return(
      <ContentOfServices>
        <Container>
        <h2>Service</h2>
           <p>Welcome to our Hospital</p>
           <Content>
           <p>Our hospital management system offers a wide range of services including secure login system for doctors, receptionists, and administrators, as well as features such as appointment reservation, medical diagnosis and treatment, prescription management, billing and pricing, and access to patient's medical history for informed decision-making.</p>
           </Content>
        </Container>
      </ContentOfServices>)
   
}

const ContentOfServices = styled.div`
padding-top: 60px;
padding-bottom: 60px; 
background-image: linear-gradient(#1E8181, #DDD );
` 
const ServicesGrid = () => {
  return (
    <ServicesContainer>
      <ServicesItem>
        <ServicesIcon src="./Images/6.svg" alt="Service 1" />
        <ServicesTitle>Secure Login System</ServicesTitle>
        <ServicesDescription>
         Our system provides a secure login page for doctors, receptionists, 
         and administrators. Each user has their own credentials and access rights to ensure privacy 
         and data protection.
        </ServicesDescription>
      </ServicesItem>
      <ServicesItem>
        <ServicesIcon src="./images/2.svg" alt="Service 2" />
        <ServicesTitle>Appointment Reservation</ServicesTitle>
        <ServicesDescription>
        Patients can use our Flutter app to choose a convenient time slot for their appointment.
         The app allows patients to view available slots,
         select a date and time, and receive a confirmation for their reservation.
        </ServicesDescription>
      </ServicesItem>
      <ServicesItem>
        <ServicesIcon src="./images/3.svg" alt="Service 3" />
        <ServicesTitle>Medical Diagnosis and Treatment</ServicesTitle>
        <ServicesDescription>
        Doctors using the Flutter app can record the patient's symptoms, perform a diagnosis,
         and prescribe appropriate treatment. They can also document the patient's medical history,
         test results, and update the treatment plan as necessary.
        </ServicesDescription>
      </ServicesItem>
      <ServicesItem>
        <ServicesIcon src="./images/4.svg" alt="Service 4" />
        <ServicesTitle>Prescription Management</ServicesTitle>
        <ServicesDescription>
        The Flutter app enables doctors to upload prescriptions for patients. 
        They can enter the prescribed medications, dosage, and any additional instructions.
         Patients can access their prescriptions online and download them if needed.
        </ServicesDescription>
      </ServicesItem>
    </ServicesContainer>
  );
};
const ServicesContainer = styled.div`
background:#DDD;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 50px 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ServicesItem = styled.div`
  /* rest of the styles */
  position: relative;
  position: relative;
  transition: transform 0.3s ease-in-out 0s;
  background:rgb(249 249 249 / 80%);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    z-index: 1;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: -1;
  }
  &:hover::before {
    opacity: 1;
  }
`;

const ServicesIcon = styled.img`
  width: 70px;
  height: 50px;

  transform: translateY(10px);
`;

const ServicesTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size:23px;
  letter-spacing :1.22px;
`;

const ServicesDescription = styled.p`
  text-align: center;
  font-size:13px;
  letter-spacing :1.42px;
`;


//Contact US Section  
const ContactUs=()=>{
  return(
      <ContentOfContactUS>
        <Container>
        <h2>Contact Us</h2>
           <p>If you have any questions or need assistance, please feel free to reach out to us.</p>
           <Content>

           </Content>
        </Container>
      </ContentOfContactUS>)
   
}

const ContentOfContactUS = styled.div`
padding-top: 60px;
padding-bottom: 60px; 
background-image: linear-gradient(#DDD,#1E8181 );
` 
const ContactGrid = () => {
  return (
    <ContactContainer>
      <ContactItem>
        <ContactIcon src="./SVG_ContactUS/contact-24hr-svgrepo-com.svg" alt="Service 1" />
        <ContactTitle> Phone</ContactTitle>
        <ContactDescription>
        For general inquiries and support, please call us at <br/> +1-123-456-7890.
        </ContactDescription>
      </ContactItem>
      <ContactItem>
        <ContactIcon src="./SVG_ContactUS/mail-svgrepo-com.svg" alt="Service 2" />
        <ContactTitle>Email</ContactTitle>
        <ContactDescription>
        For any inquiries or assistance, you can reach us via email at  <br/> info@examplehospital.com.
        </ContactDescription>
      </ContactItem>
      <ContactItem>
        <ContactIcon src="./SVG_ContactUS/address-svgrepo-com.svg" alt="Service 3" />
        <ContactTitle>Address</ContactTitle>
        <ContactDescription>
        Visit us at our main office located at 123 Main Street, City,
         State, Zip Code. We are ready to assist you in person.
        </ContactDescription>
      </ContactItem>
      
    </ContactContainer>
  );
};

const ContactContainer = styled(ServicesContainer)`
margin-top:0;
margin-bottom: 0px;
background-image: linear-gradient( #1E8181,#DDD );
grid-template-columns: repeat(3, 1fr);
@media only screen and (max-width: 700px) {
  grid-template-columns: repeat(1, 1fr);
  padding-bottom: 60px;}

`;
const ContactItem = styled.div`
/* rest of the styles */
position: relative;
position: relative;
transition: transform 0.3s ease-in-out 0s;
background:rgb(249 249 249 / 80%);
border-radius: 15px;
transition: transform 0.3s ease-in-out;
&:hover {
  transform: scale(1.05);
  z-index: 1;
}
@media only screen and (max-width: 700px) {&:hover {
  transform: scale(1.009);
}}
&::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: -1;
}
&:hover::before {
  opacity: 1;
}

`;

const ContactIcon = styled(ServicesIcon)`
  width: 70px;
  height: 50px;
  transform: translateY(10px);
`;

const ContactTitle = styled(ServicesTitle)`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size:23px;
  letter-spacing :1.22px;
`;

const ContactDescription = styled(ServicesDescription)`
  text-align: center;
  font-size:13px;
  letter-spacing :1.42px;
`;
// for SERVICES & CONTACT US ()

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: block;
  h2{
    font-size: 100px;
    font-weight: 800;
    color: wheat;
    text-align: center;
    margin: 0px;
    letter-spacing: -5px;
}
p{
  color: white;
  text-align: center;
  font-size:15px;
  letter-spacing :1.22px;
  margin: -26px 0px 0px;
}
@media only screen and (max-width: 700px) {
  h2{
    font-size: 80px;
    font-weight: 800;
    color: wheat;
    text-align: center;
    margin: -26px 0px 0px;
    letter-spacing: -5px;
}
p{
  color: white;
  text-align: center;
  font-size:15px;
  letter-spacing :1.22px;
  margin: -21px 30px 0px;

}
}
  }
` 
const Content = styled.div`
margin-top:50px;
display: flex;
justify-content: center;
align-items: center;
text-align:center;
@media only screen and (max-width: 700px) {
  margin-top:0;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-bottom: 10px;}
`
// Section of Slider Images

const ImageSlider=()=>{
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
    
  };
  return (
    <Carousel{...settings}> 
        <Wrap>
          <img src= '../imageSlider/african-american-medic-using-stethoscope-ill-patient-check-heartbeat-examination-cure-sickness-specialist-doing-healthcare-consultation-while-nurse-giving-assistance.jpg' alt="1"/>
        </Wrap>
          <Wrap>
          <img src='./imageSlider/baby-visiting-doctor-checkup.jpg' alt=""/>
        </Wrap>
            <Wrap>
            <img src='./Logo/nguy-n-hi-p-sTTeaN4wwrU-unsplash.jpg' alt=""/>
          </Wrap>
            <Wrap>
            <img src='./imageSlider/front-view-female-doctors-helping-patient.jpg' alt=""/>
          </Wrap>
            <Wrap>
            <img src='./imageSlider/little-baby-being-health-clinic-vaccination.jpg' alt=""/>
          </Wrap>
                <Wrap>
                <img src='../imageSlider/nurse-writing-prescription-disabled-senior-woman-wheelchair-after-medical-examination.jpg' alt=""/>
              </Wrap>

        </Carousel>
  )
}
const Carousel= styled(Slider)`
margin-top:20px;
button{
  z-index:1;
}
.slick-list
{
  overflow: visible;
    
}
.slick-dots li button:before {
  color:black;
  font-size: 10px;
  margin-top:10px;
}
@media (max-width: 768px) {
  .slick-dots {
    bottom:33%;}
  .slick-next{
      visibility:hidden;
    }.slick-prev{
      visibility:hidden;
    }
  }

`
const Wrap = styled.div`
cursor:pointer;
height: 500px;

img {
  object-fit: cover; 
border: 4px solid transparent;
width:100%;
height:100%;
border-radius:4px;
box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px , rgb(0 0 0 /73%) 0px 16px 10px  -10px; 
transition-duration:300ms;
//img:hover or &:hover 
// &:hover{
//   border: 4px solid rgba(249,249,249,0.8);
// }
}
img:hover{
  border: 4px solid rgba(249,249,249,0.8);
}
@media (max-width: 768px) {
img{
  height:60%;
}
}



`
//FOOTER 
const Footer=()=>{
  return(
      <ContentOfFooter>
        <h3>Our team is available to assist you during our business hours: Monday to Friday, 9:00 AM to 5:00 PM.</h3>
        <h4>Thank you for choosing our Hospital Management System!</h4>
      </ContentOfFooter>)
   
}
const ContentOfFooter = styled.div`
display: flex;
color:white;
font-size: 13px;
letter-spacing: 1.42px;
justify-content: center;
align-items: center;
flex-direction: column;
text-align:center;
background-image: linear-gradient( #DDD, #f5deb3 );
min-height:30vh;
`



//Contact Us Form 
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }

//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;
// const ContainerForm = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
//   @media  (max-width:768px){
//       display: flex;
//       flex-direction: column-reverse;}
  
// `;

// const Form = styled.form`
//   width: 100%;
//   max-width: 500px;
//   animation: ${fadeIn} 0.5s ease-in-out;

//   @media only screen and (min-width: 768px) {
//     width: 50%;
//     margin-right: 20px;
//   }
// `;

// const Input = styled.input`
//   margin-bottom: 20px;
//   padding: 10px;
//   font-size: 16px;
//   border-radius: 5px;
//   border: none;
//   box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   transform: translateX(46px);

//   &:focus {
//     outline: none;
//     box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
//   }

//   @media only screen and (min-width: 768px) {
//     width: 100%;
//     margin-right: 20px;
//   }
//   @media only screen and (max-width:768px){
//     width: 85%;
//     transform: translateX(5px);
//   }
// `;

// const TextArea = styled.textarea`
//   margin-bottom: 20px;
//   padding: 10px;
//   font-size: 16px;
//   border-radius: 5px;
//   border: none;
//   box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   height: 200px;
//   transform: translateX(46px);

//   &:focus {
//     outline: none;
//     box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
//   }

//   @media only screen and (min-width: 768px) {
//     width: 100%;
//     margin-right: 20px;
//   }
//   @media (max-width:768px){
//     width: 85%;
//     transform: translateX(5px);
//   }
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #0069d9;
//     box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
//   }

//   @media only screen and (min-width: 768px) {
//     width: auto;
//     margin-right: 20px;
//   }
// `;

// const ContactForm = () => {
//   return (
//     <ContainerForm>
//      <Form>
//         <Input type="text" name="name" required placeholder='Name'/>
//         <Input type="email" name="email" required placeholder='Email' />
//         <TextArea name="message" required placeholder='Message'/>
//         <Button type="submit">Submit</Button>
//       </Form>
//       <div>
//         <img src='/Images/11.svg' alt='3'/>
//       </div>
      
//     </ContainerForm>
//   );
// };
