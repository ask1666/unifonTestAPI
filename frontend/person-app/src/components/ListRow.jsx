import React, { useState } from "react";
import PersonDetails from "./PersonDetails";

export default function ListRow(props) {

  const [details,setDetails] = useState(false);

  const detailsDisplay = () => {
    if (details !== false) {
      return (
      <PersonDetails person={props.person}></PersonDetails>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <div>
      <div className="flex flex-row font-medium">
        <h3 className="w-6/12 text-center border border-gray-600">
          {props.person.lastname}, {props.person.firstname}
        </h3>
        <h3 onClick={() => setDetails(!details)} className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer">
          Details
        </h3>
        <h3 className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer">
          Edit
        </h3>
        <h3 className="w-2/12 text-center border border-gray-600 hover:text-blue-800 text-blue-600 cursor-pointer">
          Delete
        </h3>
      </div>
      {detailsDisplay()}
    </div>
  );
}
