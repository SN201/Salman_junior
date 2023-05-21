import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../components/Auth';
import Button from '@material-ui/core/Button'
function ReservationDetail() {
  const { id } = useParams();
  const auth = useAuth();
  const [reservation, setReservation] = useState({});
  const [formData, setFormData] = useState({
    Diagnosis:"",
    treatment:"",
    symptoms:"",
    Money:"",
    Image: ""
  });
  //const validImageTypes = ['image/jpeg', 'image/png', 'image/gif','image/zip','image/rar'];
  useEffect(() => {
    async function fetchReservation() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.auth}`,
          },
        };
        const response = await axios.get(`https://hospitalamjad.pythonanywhere.com/doctor/prescription/${id}/`, config);
        setReservation(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    // async function PoshReservation() {
    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${auth.auth}`,
    //       },
    //     };
    //     const payload = {
    //       Body: "",
    //       Image: ""
    //     };
    //     const response = await axios.post(`https://hospitalamjad.pythonanywhere.com/doctor/prescription/${id}/`, payload, config);
    //     setReservation(response.data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
    fetchReservation();
    // PoshReservation();
  }, [auth.auth, id]);
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const data = new FormData();
  //     data.append("Body", formData.Body);
  
  //     if (
  //       formData.Image &&
  //       (formData.Image.type === "application/zip" ||
  //         formData.Image.type === "application/x-rar-compressed")
  //     ) {
  //       const base64File = await toBase64(formData.Image);
  //       data.append("Image", base64File);
  //     }
  
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${auth.auth}`,
  //       },
  //     };
  //     const response = await axios.post(
  //       `https://hospitalamjad.pythonanywhere.com/doctor/prescription/${id}/`,
  //       data,
  //       config
  //     );
  //     setReservation(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  }
  
  // function handleInputChange(event) {
  //   const { name, value, type } = event.target;
  //   if (type === "file") {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: event.target.files[0],
  //     }));
  //   } else {
  //     setFormData((prevState) => ({ ...prevState, [name]: value }));
  //   }
  // }
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const data = new FormData();
  //     data.append("Body", formData.Body);
      
  //     // Check if the uploaded file is a valid image file
  //     const imageFile = formData.Image;
  //     const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //     if (!validImageTypes.includes(imageFile.type)) {
  //       throw new Error("Please upload a valid image.");
  //     }
  //     if (!formData) {
  //       throw new Error("Form data is missing.");
  //     }
      
      
  //     data.append("Image", await toBase64(imageFile));
      
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${auth.auth}`,
  //       },
  //     };
  //     const response = await axios.post(
  //       `https://hospitalamjad.pythonanywhere.com/doctor/prescription/${id}/`,
  //       data,
  //       config
  //     );
  //     setReservation(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     // console.error(error);
  //     if (error.response) {
  //       console.error(`Server responded with error ${error.response.status}: ${error.response.data.detail}`);
  //     } else if (error.request) {
  //       console.error("Network error. Please check your internet connection.");
  //     } else if (error.message === "Please upload a valid image.") {
  //       alert("Please upload a valid image (JPG, PNG, or GIF).");
  //     } else {
  //       console.error("Unknown error:", error);
  //     }
      
  //   }
  // }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("Diagnosis", formData.Diagnosis);
      data.append("treatment", formData.treatment);
      data.append("symptoms", formData.symptoms);
      data.append("Money", formData.Money);
  
      // add a check to ensure that formData.Image is of type Blob
      if (formData.Image instanceof Blob) {
        const base64Image = await toBase64(formData.Image);
        if (base64Image) {
          data.append("Image", base64Image);
        } else {
          console.error("Invalid file type. Please upload a valid image file.");
          return;
        }
      } else {
        console.error("Invalid file type. Please upload a valid image file.");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${auth.auth}`,
        },
      };
      const response = await axios.post(
        `https://hospitalamjad.pythonanywhere.com/doctor/prescription/${id}/`,
        data,
        config
      );
      setReservation(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  

  function handleInputChange(event) {
    const { name, value, type } = event.target;
    if (type === "file") {
      setFormData((prevState) => ({ ...prevState, [name]: event.target.files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  return (
    <Container>
      <Options>
        <OptionButton>
          <div>
            {Object.keys(reservation).length > 0 && (
              <div>
                <p>MedicalHistory: {reservation["medical_history"]}</p>
                <p>High: {reservation["High"]}</p>
                <p>Weight: {reservation["Weight"]}</p>
              </div>
            )}
          </div>
        
     
      <Form onSubmit={handleSubmit}>
        <label>
        Diagnosis:
          <TextArea
            type="text"
            name="Diagnosis"
            value={formData.Diagnosis}
            onChange={handleInputChange}
          />
        </label>
        <label>
        treatment:
          <TextArea
            type="text"
            name="treatment"
            value={formData.treatment}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bsymptomsody:
          <TextArea
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image (zip or rar files only):
          <input
            type="file"
            name="Image"
            // accept=".zip,.rar,*,*/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (
                file &&
                (file.type.includes("image") ||
                  file.type.includes("zip") ||
                  file.type.includes("rar"))
              ) {
                setFormData({ ...formData, Image: file });
              } else {
                setFormData({ ...formData, Image: null });
              }
            }}
          /><br/>
        </label>
        {formData.Image && (
          <SelectedFile>
            <SelectedFileHeading>Selected file:</SelectedFileHeading>
            <SelectedFileDetails>Name: {formData.Image.name}</SelectedFileDetails>
            <SelectedFileDetails>Size: {formData.Image.size} bytes</SelectedFileDetails>
            <SelectedFileDetails>Type: {formData.Image.type}</SelectedFileDetails>
          </SelectedFile>
        )}
        <label>
        Money:
          <input
            type="number"
            name="Money"
            onChange={handleInputChange}
          />
        </label>
        <B>
        <Button type="submit" variant="contained">Submit</Button>
        <br/>   <br/>
        </B>
        
        <Link to='/showreservation'>go back</Link>
      </Form>
      </OptionButton>
      </Options>
    </Container>

  );
}

export default ReservationDetail;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-image: linear-gradient(white, rgb(36, 113, 121));
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  
`;

const OptionButton = styled.button`
  display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 485px;
    height: auto;
    padding: 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background-image: linear-gradient(white, rgb(36, 113, 121));
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 10px;
    transition: all 0.3s ease 0s;
    margin: 20px;
    @media (max-width:768px){
      width: 385px;
      transform: translateX(5px);
    }
`;

const Form = styled.form`
  border-radius: none;
a {
    text-decoration: none;
    font-size: medium;
    color: black;
    cursor: pointer;
    font-weight: bolder;
}
a:hover{
  color:palegoldenrod;
}
  label {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 15px;

    input[type='number'] {
      width: 60%;
      height: 30px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1.2rem;
      border-radius: 5px;
      border: none;
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      background: transparent;
      border-radius: 5px;
     border: none;
     box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.6);
     transition: box-shadow 0.2s ease-in-out;

  &:hover:not(:focus),
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    border: none;
  }
  button[type='file'] {
    display: inline-block;
position: relative;
margin-top: 10px;
padding: 10px;
font-size: 16px;
cursor: pointer;
background: transparent;
color: #000;
transition: background-color 0.3s ease;
    
  }
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    input[type='file'] {
      display: inline-block;
  position: relative;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  border-radius: 5px;
  border: none;
  color: #000;
  transition: background-color 0.3s ease;
      
    }
  }
`;
const B = styled.div`

button[type='submit'] {
  margin-bottom: 15px;
  background-color: palegoldenrod;

    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
`
const SelectedFile = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
`;

const SelectedFileHeading = styled.h4`
margin-bottom: 5px;
`;

const SelectedFileDetails = styled.p`
margin: 0;
`;

const TextArea = styled.textarea`

margin-bottom: 30px;
margin-top: 15px;
padding: 10px;
font-size: 16px;
border-radius: 5px;
border: none;
box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
width: 100%;
    height: 50%;
    background: transparent;
    border: none;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.6);
    transition: box-shadow 0.2s ease-in-out;
  
    &:hover:not(:focus),
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
      border: none;
    }
&:focus {
  outline: none;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
}

@media only screen and (min-width: 768px) {
  width: 100%;
  margin-right: 20px;
  width: 388px;
    height: 67px;
    transform: translate(10px, 10px);
}
@media (max-width:768px){
  width: 85%;
  transform: translateX(5px);
}
`;