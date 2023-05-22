import React,{useState,useEffect} from 'react'
 import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../components/Auth';
// import { Link } from 'react-router-dom';
//import ReservationDetail from './ReservationDetail';
import { Link } from 'react-router-dom';
function ShowReservation({key}) {
    const auth = useAuth();
    const [reservations, setReservations] = useState([]);
    console.log("key:"+auth.auth);
    useEffect(() => {
        async function fetchData() {
          const config = {
            headers: {
                 'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.auth}`,
            },
          };
          const response = await axios.get('https://hospitalamjad.pythonanywhere.com/doctor/showreservation/', config);
          setReservations(response.data);
          console.log(response.data);
        }
        fetchData();
      }, [auth.auth]);
  return (
    <>
   
    <Container>
    <h1>Reservation List</h1>
    
    {reservations.map((reservation) => (
     
      <div key={reservation.pk}>
       
        <Link to={`/Salman_junior/reservation/${reservation.pk}`}>
        <Title>Reservation for {reservation.name}
        </Title> 
       <OptionButton> <Options>
      
        <p>Date: {reservation.Day}</p>
        <p>Time: {reservation.Time}</p>
       
        </Options>  </OptionButton>
        </Link>
      </div>

    ))}
   
    </Container>
  </>
  )
}

export default ShowReservation

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f4f4f4;
  a{
    text-decoration: none;
  }
`;

const Title = styled.h1`
font-size: 23px;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1.42px;
  color: cadetblue;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 800px;
  width: 90%;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const OptionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: auto;
  padding: 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;