import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button'
function AdminDashboard() {
  // state for users, doctors, and sections
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [sections, setSections] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  // const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  //FOR update Sections
  const [sectionNames, setSectionNames] = useState(
    sections.map((section) => section.Name)
  );
  // state for adding/updating users / doctor / user(paitane)
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    personal_id: '',
    High: '',
    Weight: '',
    sex: '',
    medical_history: '',
    password:'',
  });
  const [newDoctor, setNewDoctor] = useState({
    username: '',
    name: '',
    personal_id: '',
    license: '',
    certificate: '',
    specialty: '',
    password: '',
    sex: '',
    from:'',
    to:'',
    phone:'',
    age:'',
  });
  
  const [newSection, setNewSection] = useState({
    name: '',
  });
  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      // Create new FormData object
      const formData = new FormData();
      formData.append('name', newUser.name);
      formData.append('username', newUser.username);
      formData.append('High', newUser.High);
      formData.append('Weight', newUser.Weight);
      formData.append('sex', newUser.sex);
      formData.append('medical_history', newUser.medical_history);
      formData.append('password', newUser.password);
      formData.append('personal_id', newUser.personal_id);
  
      // Send POST request to backend API to add new user
      const response = await axios.post('https://hospitalamjad.pythonanywhere.com/phddamin/patient/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setUsers([...users, response.data]);
      setNewUser({
        name: '',
        username: '',
        High: '',
        Weight: '',
        sex: '',
        medical_history: '',
        password: '',
        personal_id: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUpdateUser = async (index, updatedUser) => {
    try {
      // Send PUT request to backend API to update the section
      const response = await axios.put(
        `https://hospitalamjad.pythonanywhere.com/phddamin/patient/${users[index].pk}/`,
        updatedUser,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      // Check if the section was updated successfully
      if (response.status === 200) {
        console.log('User updated successfully!');
        console.log(response.data);
        // Update the local state with the updated section
        const updatedUser = [...users];
        updatedUser[index] = response.data;
        setUsers(updatedUser);
      } else {
        console.log('Failed to update User!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async (index) => {
    try {
      // Send DELETE request to backend API to delete the section
      await axios.delete(`https://hospitalamjad.pythonanywhere.com/phddamin/patient/${users[index].pk}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Remove the deleted section from the local state
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  //state for adding/updating SECTION
  const handleAddSection = async (event) => {
    event.preventDefault();
    console.log(newDoctor);
    try {
      // Send POST request to backend API to add new section
      const response = await axios.post('https://hospitalamjad.pythonanywhere.com/phddamin/specialty/', {
        Name: newSection.name,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Add the newly created section to the local state
      console.log(response.data);
      setSections([...sections, response.data]);
      // Clear the form input fields
      setNewSection({
        name: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteSection = async (index) => {
    try {
      // Send DELETE request to backend API to delete the section
      await axios.delete(`https://hospitalamjad.pythonanywhere.com/phddamin/specialty/${sections[index].pk}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Remove the deleted section from the local state
      const updatedSections = [...sections];
      updatedSections.splice(index, 0);
      setSections(updatedSections);
      console.log(sections);
    } catch (error) {
      console.error(error);
    }
  };
  //Doctor 
const handleAddDoctor = async (event) => {
  event.preventDefault();
  try {
    const data = new FormData();
    data.append('username', newDoctor.username);
    data.append('name', newDoctor.name);
    data.append('personal_id', newDoctor.personal_id);
    data.append('License', newDoctor.License);
    data.append('certificate', newDoctor.certificate);
    data.append('specialty', newDoctor.specialty);
    data.append('password', newDoctor.password);
    data.append('sex', newDoctor.sex);
    data.append('From', newDoctor.from);
    data.append('To', newDoctor.to);
    data.append('phone', newDoctor.phone);
    data.append('age', newDoctor.age);

    const response = await axios.post('http://hospitalamjad.pythonanywhere.com/phddamin/doctor/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setDoctors([...doctors, response.data]);
    console.log(response.data);
    setNewDoctor({
      username: '',
      name: '',
      personal_id: '',
      License: '',
      certificate: '',
      specialty: '',
      password: '',
      sex: '',
      from:'',
      to:'',
      phone:'',
      age:'',
    });
  } catch (error) {
    console.error(error);
  }
};
  const handleDeleteDoctor = async (index) => {
    try {
      // Send DELETE request to backend API to delete the section
      await axios.delete(`https://hospitalamjad.pythonanywhere.com/phddamin/doctor/${doctors[index].pk}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Remove the deleted section from the local state
      const updatedDoctors = [...doctors];
      updatedDoctors.splice(index, 0);
      setSections(updatedDoctors);
      console.log(doctors);
    } catch (error) {
      console.error(error);
    }
  };
  //diplay Doc & User & Spci
useEffect(() => {
  async function fetchSpecialtyData() {
    const response = await axios.get('https://hospitalamjad.pythonanywhere.com/phddamin/specialty/');
    setSections(response.data);
    console.log(response.data);
  }
  async function fetchDoctorData() {
    const response = await axios.get('http://hospitalamjad.pythonanywhere.com/phddamin/doctor/');
    setDoctors(response.data);
    console.log(response.data);
  }
  async function fetchPatientData() {
    const response = await axios.get('http://hospitalamjad.pythonanywhere.com/phddamin/patient/');
    setUsers(response.data);
    console.log(response.data);
  }
  // fetch specialties from backend
  axios.get('https://hospitalamjad.pythonanywhere.com/phddamin/specialty/')
  .then(response => setSpecialties(response.data))
  .catch(error => console.error(error));
  fetchSpecialtyData();
  fetchDoctorData();
  fetchPatientData();

},[] );
  return (
    <Div> 
    <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Admin Dashboard</h1>
      <FormGroup>
  <h2>Add Section</h2>
  <form onSubmit={handleAddSection}>
    <label>Name:</label>
    <input
      type="text"
      value={newSection.name}
      onChange={(event) =>
        setNewSection({ ...newSection, name: event.target.value })
      }
    />
    <Button  type="submit" variant="contained">Add User</Button>
  </form>
</FormGroup>
<FormGroup>
  <h2>Add Doctor</h2>
  <form onSubmit={handleAddDoctor} enctype="multipart/form-data">
  <label>Account</label>
  <input
    type="text"
    value={newDoctor.username}
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, username: event.target.value })
    }
  />
  <label>FullName </label>
  <input
    type="text"
    value={newDoctor.name}
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, name: event.target.value })
    }
  />
  <label>Password:</label>
  <input
    type="password"
    value={newDoctor.password}
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, password: event.target.value })
    }
  />
  <label>personalId:</label>
  <div class="file-upload-wrapper">
  <input
    type="file"
    accept=".pdf"
    class="file-upload"
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, personal_id: event.target.files[0] })
    }
  />
  </div>
  <label>Specialty:</label>
  <select
  value={newDoctor.specialty}
  onChange={(event) =>
    setNewDoctor({ ...newDoctor, specialty: parseInt(event.target.value) })
  }
>
  {specialties.map(specialty => (
    <option key={specialty.index} value={specialty.pk}>
      {specialty.Name} رقم : {specialty.pk}
    </option>
  ))}
</select>
  <label>License:</label>
  <div class="file-upload-wrapper">
  <input
    type="file"
    accept=".pdf"
    class="file-upload"
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, License: event.target.files[0] })
    }
  />
  </div>
  <label>certificate:</label>
  <div class="file-upload-wrapper">
  <input
    type="file"
    accept=".pdf"
    class="file-upload"
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, certificate: event.target.files[0] })
    }
  />
  </div>
  <label>sex:</label>
  <input
    type="text"
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, sex: event.target.value})
    }
  />
 <label>From:</label>
<input
  type="txt"
  step={0}
  required
  onChange={(event) =>
    setNewDoctor({
      ...newDoctor,
      from: event.target.value,
    })
  }
/>

<label>To:</label>
<input
  type="txt"
  step={0}
  required
  onChange={(event) =>
    setNewDoctor({
      ...newDoctor,
      to: event.target.value,
    })
  }
/>
<label>Phone:</label>
  <input
    type="number"
    value={newDoctor.phone}
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, phone: event.target.value })
    }
  />
    <label>Age:</label>
  <input
    type="number"
    value={newDoctor.age}
    onChange={(event) =>
      setNewDoctor({ ...newDoctor, age: event.target.value })
    }
  />


<Button  type="submit" variant="contained">Add User</Button>
</form>

  </FormGroup>
  <FormGroup>
        <h2>Add User</h2><br/>
  <form onSubmit={handleAddUser}>
    <label>FullName:</label>
    <input
      type="text"
      onChange={(event) =>
        setNewUser({ ...newUser, name: event.target.value })
      }
    />
    <label>UserName</label>
    <input
      type="text"
      onChange={(event) =>
        setNewUser({ ...newUser, username: event.target.value })
      }
    />
    <label>Weight:</label>
    <input
      type="number"
      onChange={(event) =>
        setNewUser({ ...newUser, Weight: event.target.value })
      }
    />
    <label>High:</label>
    <input
      type="number"
      onChange={(event) =>
        setNewUser({ ...newUser, High: event.target.value })
      }
    />
    <label>Sex:</label>
    <input
      type="text"
      onChange={(event) =>
        setNewUser({ ...newUser, sex: event.target.value })
      }
    />
     <label>MedicalHistory:</label>
    <input
      type="text"
      onChange={(event) =>
        setNewUser({ ...newUser, medical_history: event.target.value })
      }
    />
<label>PersonalID</label>
 <div class="file-upload-wrapper">
    <input
      type="file"
      accept=".pdf"
      class="file-upload-input"
      onChange={(event) =>
        setNewUser({ ...newUser, personal_id: event.target.files[0] })
      }
    />
  </div>
    <label>password:</label>
  <input
        type="password"
      onChange={(event) =>
        setNewUser({ ...newUser, password: event.target.value })
      }
    />
    <Button  type="submit" variant="contained">Add User</Button>
  </form>
</FormGroup>
<Order>
<FormGroup>
    <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>FullName</th>
              <th>Username</th>
              <th>PersonalID</th>
              <th>High</th>
              <th>Weight</th>
              <th>Sex</th>
              <th>MedicalHistory</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                <br/>
         <label>Name</label>
         <br/>
                  <input
                  disabled
                    type="text"
                    value={user.name}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        name: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>Username</label>
         <br/>
                  <input
                    disabled
                    type="text"
                    value={user.username}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        username: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>PersonalID</label>
         <br/>
                  <input
                    disabled
                    type="text"
                    value={user.personal_id}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        personal_id: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>High</label>
         <br/>
                  <input
                    disabled
                    type="number"
                    value={user.High}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        High: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>Weight</label>
         <br/>
                  <input
                    disabled
                    type="number"
                    value={user.Weight}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        Weight: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>Gender</label>
         <br/>
                  <input
                    disabled
                    type="text"
                    value={user.sex}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        sex: event.target.value,
                      })
                    }
                  />
                </td>
                <td>
                <br/>
         <label>MedicalHistory</label>
         <br/>
                  <input
                    disabled
                    type="text"
                    value={user.medical_history}
                    onChange={(event) =>
                      handleUpdateUser(index, {
                        ...user,
                        medical_history: event.target.value,
                      })
                    }
                  />
                </td>
                <td></td>
                <td>
                  <Button onClick={() => handleDeleteUser(index)} variant="contained">Delete</Button>
                </td>
                
                {/* <td>
               
                  <Button variant="contained">Svae</Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
</FormGroup>
<FormGroup>
  <h2>Doctors</h2>
  <table>
    <thead>
      <tr>
        <th>Account</th>
        <th>FullName</th>
        <th>Personal id</th>
        <th>License</th>
        <th>Specialty</th>
        <th>Certificate</th>
        <th>Sex</th>
        <th>To</th>
        <th>From</th>
        <th>Phone</th>
        <th>Age</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor, index) => (
        <tr key={index}>
          <td>
          <br/>
          <label>Usename</label>
          <br/>
            <input
              type="text"
              disabled
             value={doctor.username}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     Account: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
            <br/>
          <label>Name</label>
          <br/>
            <input
              disabled
              type="text"
              value={doctor.name}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     FullName: event.target.value,
              //   })
              // }
            />
          </td>
          <td>  <br/>
          <label>personalID</label>
          <br/>
            <input
              type="txt"
              disabled
              value={doctor.personal_id}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     personal_id: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
         <label>License</label>
         <br/>
            <input
              disabled
              type="text"
              value={doctor.License}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     License: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>Specialty</label>
          <br/>
            <input
              type="number"
              disabled
              value={doctor.specialty}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     specialty: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>Certificate</label>
          <br/>
           <input
              type="text"
              disabled
              value={doctor.certificate}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     certificate: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>Sex</label>
          <br/>
            <input
              type="text"
              disabled
              value={doctor.sex}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     sex: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
       <label>From</label>
       <br/>  
            <input
              type="text"
              disabled
              value={doctor.From}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     From: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>To</label>
          <br/>
            <input
              type="text"
              disabled
              value={doctor.To}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     To: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>Phone</label>
          <br/>
           <input
              type="text"
              disabled
              value={doctor.phone}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     phone: event.target.value,
              //   })
              // }
            />
          </td>
          <td>
          <br/>
          <label>Age</label>
          <br/>
             <input
              type="text"
              disabled
              value={doctor.age}
              // onChange={(event) =>
              //   handleUpdateDoctor(index, {
              //     ...doctor,
              //     age: event.target.value,
              //   })
              // }
          />
          </td>
          <br/>
          <td>
          <DoctorButton>
            <td>
            
           <Button  onClick={() => handleDeleteDoctor(index)} variant="contained">Delete</Button>
           
            </td>
            </DoctorButton>
            
            {/* <td>
            <Button onClick={() => handleUpdateDoctor(index)} variant="contained">Update</Button>
            </td> */}
        
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</FormGroup>
<FormGroup>
<h2>Sections</h2>
<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Update Name</th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    </tr>
</thead>
<tbody>
    {sections.map((section, index) => (
    <tr key={index} section={section}>
      <td>{section.Name}</td>
      <br/>
        <td>
        <input
            type="text"
        
            value={sectionNames[index]}
            placeholder='Update Section'
            onChange={(event) => {
              const newSectionNames = [...sectionNames];
              newSectionNames[index] = event.target.value;
              setSectionNames(newSectionNames);
            }}
        />
        </td>
        <td>
        {/* <Button   onClick={() => handleUpdateSection(index, {...section,Name:sectionNames[index], }) } variant="contained">update</Button> */}
        </td>
   
        <td>  <Button style={{ transform: 'translateY(-3px)' }} onClick={() => handleDeleteSection(index)} variant="contained">Update</Button></td>
    
    </tr>
    ))}
</tbody>
</table>
</FormGroup>
</Order>
</Div>
);
}
export default AdminDashboard;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  .file-upload-wrapper {
    display: inline-block;
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 50px;
    background-color: #dddddd7d;
    border-radius: 4px;
    border: 1px solid #ddd;
    overflow: hidden;
    text-align: center;
    line-height: 50px;
  }
  
  .file-upload-wrapper:hover {
    background-color: #DDD;
  }
  
  .file-upload-wrapper:before {
    content: 'Select file';
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
  
  .file-upload-wrapper:hover:before {
    color: black;
  }
  
  .file-upload-wrapper:active {
    background-color: #ddd;
  }
  
  .file-upload-wrapper:active:before {
    color: #007bff;
  }
  
  .file-upload-wrapper input[type='file'] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-upload-wrapper label {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-upload-wrapper input[type='file']:focus + label:before {
    outline: none;
    border: 1px dashed #007bff;
    
  }
  margin: 20px;
}

h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

table {
  border-collapse: collapse;
  width: 100%;
}
lable{
  display:none;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;   
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
select {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    // background-color: #247179;
    // color:wheat;
  }
  option{ font-size: 16px; }
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 40px;
  }

  tbody {
    background-color: #fff;
    color: #333;
  }

  tr {
    &:nth-child(even) {
      background-color: #f2f2f2;
      padding: 8px;
      border: none;

      margin-bottom: 10px;
      width: 100%;
      background: transparent;

      &:hover {
        background-color: #ddd;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.3);
      }
    }
  }

  td {
    //padding: 8px;
  }

  th {
    padding: 8px;
    background-color: #4caf50;
    color: #fff;
    font-weight: bold;
    text-align: left;
  }

  button {
    background-color: #1E8181;
    color: #fff;
    padding: 8px 12px;
    border: none;
    transform: translateY(14px);
    cursor: pointer;

    &:hover {
      background-color: #1E8184;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.3);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    transition: box-shadow 0.2s ease-in-out;
  
    &:hover:not(:focus),
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #1E8181 ;
    }

 
    margin-bottom: 10px;
    width: 100%;
    font-size: 16px;
  }
  
  input[type="file"] {
    margin-bottom: 0;
  }
  
  button[type="submit"] {
    background-image: linear-gradient(white, rgb(36, 113, 121));
    color: wheat ;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0069d9;
  }
  table{
  width: 100%;
  border: none;
  border-collapse: collapse;
  margin-bottom: 20px;

  th{
    border: none;
    padding: 8px;
    text-align: left;
  }
  td {
    border: none;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #1E8181;
    font-weight: bold;
  }
  label{
    display:none;
  }

  @media (max-width: 948px) {
   
    thead{
      display: none;
    }
    table{ display: block;
    position: relative;
    width: 100%;
    overflow-x: auto;}

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
      border: none;
    }
    label{
      display:block;
    }
    th,
    td {
      min-width: 150px;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      white-space: normal;
      border: none;
    }
    button{
      transform: translate(-40px, 2px);
    }
   
  }
  
  
  
`  
const Order = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const DoctorButton= styled.div`
@media (max-width: 768px) {
 
  transform: translate(80px, 2px);
}
`
