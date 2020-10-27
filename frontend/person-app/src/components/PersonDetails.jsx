import React from 'react'


export default function PersonDetails(props) {
  return (
    <div className="flex font-medium border border-gray-600">
      <h3 className=" p-2 ">
        Firstname:
      </h3>
      <input value={props.person.firstname} disabled/>
      <h3 className=" p-2 ">
        Lastname:
      </h3>
      <input value={props.person.lastname} disabled/>
    </div>
  )
}