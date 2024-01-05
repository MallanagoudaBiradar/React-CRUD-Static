import React from "react";
import "./App.css"
import { EmpData } from "./EmpData";
import { useState,useEffect } from "react";

function App() {

  const [data , setData]= useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState('');
  const [age, setAge ] = useState(0);
  const [id , setId] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);
   
  useEffect(() =>{
    setData(EmpData);
  },[])

  const handleEdit = (id)=>{
    const dt = data.filter(item => item.id === id);
    if(id !== undefined){
      setisUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  const handleChange = (e)=>{

    let error = '';
    if(firstName === ''){
      error += 'First name is required';
    }
    if(lastName === ''){
      error += 'last name is required';
    }
    if(age <=0){
      error += 'age is required';
    }
    if(error === ''){
   e.preventDefault();
   const dt = [...data];
   const newObject = {
      id : EmpData.length+1,
      firstName : firstName,
      lastName: lastName,
      age: age
   }
   dt.push(newObject);
   setData(dt);
  }
  else{
    alert(error)
  }
  }

  const handleUpdate = () => {
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
      const dt = [...data];
      dt[index].firstName = firstName;
      dt[index].lastName = lastName;
      dt[index].age = age;
      setData(dt);
      handleChange();
    }
  };
  const handleClear = (id)=>{
    setId(id);
      setFirstName('');
      setLastName('');
      setAge('');
      setisUpdate(false);
  }

  const handleDelete = (id)=>{
    if(id>0){
      if(window.confirm("Are you sure you want to delete?")){
        const dt = data.filter(item => item.id!==id); 
        setData(dt);
      }
    }
  }
  return (
    <div>
    <h1>Static CRUD Operation</h1>

    <div className="header">
      <label>First Name</label>
      <input type="text" placeholder="Enter your First Name" onChange={(e)=> setFirstName(e.target.value)} value={firstName}/>
      <label>Last Name</label>
      <input type="text" placeholder="Enter your Last Name" onChange={(e)=> setLastName(e.target.value)} value={lastName}/>
      <label>Age</label>
      <input type="text" placeholder="Enter your Age Name" onChange={(e)=> setAge(e.target.value)} value={age}/>
      {
        !isUpdate ? <button className="btn btn-primary" onClick={(e)=> handleChange(e)}> Save Changes</button>
        :<button className="btn btn-primary" onClick={()=> handleUpdate()}> Update</button>

      }
      
      
    <button className="btn btn-danger" onClick={()=> handleClear()}>Clear</button>

    </div>


    <div className="tableBox">
    <table className="table table-hover">
      <thead>
        <tr>
          <td>Sr.No</td>
          <td>ID NO</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Age</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index) => {
            return (
              <tr key={index}>
                <td>{index +1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}> Edit</button>&nbsp;
                  <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
    </div>
  );
}

export default App;
