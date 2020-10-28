import React, { useState } from "react";
import PersonDetails from "./PersonDetails";
import EditPerson from "./EditPerson";
import Axios from "axios";

export default function ListRow(props) {
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);

  const detailsDisplay = () => {
    if (details !== false) {
      return <PersonDetails person={props.person}></PersonDetails>;
    } else {
      return <div></div>;
    }
  };

  const toggleDisplay = (display) => {
    if (display === "details" && !details) {
      setDetails(true);
      setEdit(false);
    } else if (display === "edit" && !edit) {
      setDetails(false);
      setEdit(true);
    } else {
      setDetails(false);
      setEdit(false);
    }
  };

  const editDisplay = () => {
    if (edit !== false) {
      return (
        <EditPerson
          toggleDisplay={toggleDisplay}
          reloadPeople={props.reloadPeople}
          person={props.person}
        ></EditPerson>
      );
    } else {
      return <div></div>;
    }
  };

  const deletePerson = () => {
    Axios.delete("http://localhost:8000/person/" + props.person.id)
      .then((res) => {
        props.reloadPeople();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-row font-medium xl:w-5/12 md:w-9/12 lg:w-7/12 w-full">
          <h3 className="w-6/12 text-center border border-gray-600">
            {props.person.lastname}, {props.person.firstname}
          </h3>
          <h3
            onClick={() => toggleDisplay("details")}
            className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer"
          >
            Details
          </h3>
          <h3
            onClick={() => toggleDisplay("edit")}
            className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer"
          >
            Edit
          </h3>
          <h3
            onClick={() => deletePerson()}
            className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer"
          >
            Delete
          </h3>
        </div>
      </div>
      {detailsDisplay()}
      {editDisplay()}
    </div>
  );
}
