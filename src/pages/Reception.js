import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
function Reception() {
  const [username, setUsername] = useState("");
  const [accountData, setAccountData] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleReset = () => {
    setUsername(null);
    setAccountData(null);
    setPaymentStatus(null);
  }

  const getAccountData = async () => {
    try {
      const data = await axios.post("http://hospitalamjad.pythonanywhere.com/phddamin/money/", {
        username: username,
      });
      setAccountData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async () => {
    try {
      const response = await axios.post(
        accountData?.data?.pay,
        { username: username }
      );
      if (response?.data?.detail) {
        setPaymentStatus({ success: true, message: response.data.detail });
      } else {
        console.error("Invalid response from server:", response);
        setPaymentStatus({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.error("Error making payment:", error);
      setPaymentStatus({ success: false, message: "Payment failed" });
    }
  };

  return (
    <Content>
    <Container>
    <Title>Account Page</Title>
    <Label htmlFor="username">Username:</Label>
    <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    <Button onClick={getAccountData}>Get Account Data</Button>
    {accountData && (
      <div>
        <h2>Account Data:</h2>
        <p>Username: {username}</p>
        <p>Balance: {accountData.data.money}</p>
      </div>
    )}
    <Button onClick={handlePay}>Pay</Button>
    {paymentStatus && (
      <div>
        <h2>Payment Status:</h2>
        <StatusMessage success={paymentStatus.success}>
          {paymentStatus.success ? `Payment successful: ${paymentStatus.message}` : `Payment failed: ${paymentStatus.message}`}
        </StatusMessage>
      </div>
    )}
  
    <Button onClick={handleReset}>Reset</Button>
  
  </Container>
  </Content>
  );
}

export default Reception;
const Content = styled.div`
display: flex;
background-image: linear-gradient( rgb(36, 113, 121), white);
`
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 24px;
max-width: 800px;
margin: 0 auto;
button{
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  background-color: palegoldenrod;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover{
    background-color: palegoldenrod;
    opacity:0.9;
  }
}

@media (max-width: 768px) {
  padding: 16px;
}
`;

const Title = styled.h1`
font-size: 2rem;
margin-bottom: 24px;
text-align: center;

@media (max-width: 768px) {
  font-size: 1.5rem;
  margin-bottom: 16px;
}
`;

const Label = styled.label`
font-size: 1.2rem;
margin-bottom: 8px;

@media (max-width: 768px) {
  font-size: 1rem;
}
`;

const Input = styled.input`
width: 100%;
    height: 30px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    border-radius: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 1px;
    transition: box-shadow 0.2s ease-in-out;
    &:hover:not(:focus),
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #1E8181 ;
    }
@media (max-width: 768px) {
  font-size: 1rem;
  padding: 6px;
  margin-bottom: 12px;
}
`;
const StatusMessage = styled.p`
font-size: 1.2rem;
margin-top: 8px;

${({ success }) => success
  ? `color: lightseagreen;`
  : `color: crimson;`
}

@media (max-width: 768px) {
  font-size: 1rem;
  margin-top: 4px;
}
`;
