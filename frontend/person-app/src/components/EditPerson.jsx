import Axios from "axios";
import React, { useState } from "react";

export default function EditPerson(props) {
  const [firstname, setFirstname] = useState(props.person.firstname);
  const [lastname, setLastname] = useState(props.person.lastname);
  const [age, setAge] = useState(props.person.age);
  const [address, setAddress] = useState(props.person.address);
  const [phonenumber, setPhonenumber] = useState(props.person.phonenumber);
  const [department, setDepartment] = useState(props.person.details.department);
  const [skills, setSkills] = useState(props.person.details.skills);

  const changeSkills = (event) => {
    const temp = event.target.value.split(",");
    setSkills(temp);
  };

  const submitEdit = () => {
    Axios.put("http://localhost:8000/person/" + props.person.id, {
      firstname: firstname,
      lastname: lastname,
      age: parseInt(age),
      address: address,
      phonenumber: phonenumber,
      details: {
        department: department,
        skills: skills,
      },
    })
      .then((res) => {
        props.reloadPeople();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="border border-gray-600 xl:w-5/12 md:w-9/12 lg:w-7/12 w-full">
        <div className="flex flex-wrap font-medium">
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">ID:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.id}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Firstname:</h3>
            <input
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.firstname}
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Lastname:</h3>
            <input
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.lastname}
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Age:</h3>
            <input
              onChange={(event) => {
                setAge(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.age}
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Created Date:</h3>
            <input
              className="pl-2 border border-gray-700"
              defaultValue={props.person.created_date}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">phonenumber:</h3>
            <input
              onChange={(event) => {
                setPhonenumber(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.phonenumber}
            />
          </div>
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">Address:</h3>
            <input
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.address}
            />
          </div>
        </div>
        <h3 className="text-center font-medium py-2"> Details:</h3>
        <div className="flex font-medium flex-wrap">
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">Department:</h3>
            <input
              onChange={(event) => {
                setDepartment(event.target.value);
              }}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.details.department}
            />
          </div>
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">skills:</h3>
            <input
              onChange={changeSkills}
              className="pl-2 border border-gray-700"
              defaultValue={props.person.details.skills}
            />
          </div>
        </div>
        <div className="py-4 flex justify-center">
          <button
            onClick={submitEdit}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          >
            Submit Changes
          </button>
        </div>
      </div>
    </div>
  );
}
