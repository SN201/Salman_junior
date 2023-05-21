import React, { useState } from 'react';
import styled from 'styled-components';

function ChooseDoctor() {
  const [isGeneralDoctorSelected, setIsGeneralDoctorSelected] = useState(false);
  const [isSpecialistDoctorSelected, setIsSpecialistDoctorSelected] = useState(false);

  const handleGeneralDoctorSelect = () => {
    setIsGeneralDoctorSelected(true);
    setIsSpecialistDoctorSelected(false);
  };

  const handleSpecialistDoctorSelect = () => {
    setIsSpecialistDoctorSelected(true);
    setIsGeneralDoctorSelected(false);
  };

  return (
    <Container>
      <Title>Select a doctor</Title>
      <Options>
        <OptionButton isSelected={isGeneralDoctorSelected} onClick={handleGeneralDoctorSelect}>
          <Photo src="/photo/pexels-cottonbro-studio-5722163.jpg" alt="General Doctor" />
          <OptionLabel>General Practitioner</OptionLabel>
        </OptionButton>
        <OptionButton isSelected={isSpecialistDoctorSelected} onClick={handleSpecialistDoctorSelect}>
          <Photo src="/photo/pexels-tima-miroshnichenko-5452298.jpg" alt="Specialist Doctor" />
          <OptionLabel>Specialist</OptionLabel>
        </OptionButton>
      </Options>
    </Container>
  );
}

export default ChooseDoctor;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
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
  background-color: ${(props) => (props.isSelected ? 'lightgoldenrodyellow' : '#fff')};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
  @media screen and (max-width: 768px) {
    width: 46%;
    height: auto;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    height: 50%;
  }
`;

const OptionLabel = styled.span`
  margin-top: 25px;
  text-align: center; 
  font-size: 12px;
  letter-spacing: 1.42px;

  color: ${(props) => (props.isSelected ? '#fff' : '#333')};
`;
