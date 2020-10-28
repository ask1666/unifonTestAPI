import React from "react";

export default function PersonDetails(props) {
  return (
    <div className="flex justify-center">
      <div className="border border-gray-600  xl:w-5/12 md:w-9/12 lg:w-7/12 w-full">
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
              className="pl-2 border border-gray-700"
              value={props.person.firstname}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Lastname:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.lastname}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Age:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.age}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">Created Date:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.created_date}
              disabled
            />
          </div>
          <div className="flex justify-between flex-row w-6/12">
            <h3 className="pl-2">phonenumber:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.phonenumber}
              disabled
            />
          </div>
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">Address:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.address}
              disabled
            />
          </div>
        </div>
        <h3 className="text-center font-medium py-2"> Details:</h3>
        <div className="flex font-medium flex-wrap">
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">Department:</h3>
            <input
              className="pl-2 border border-gray-700"
              value={props.person.details.department}
              disabled
            />
          </div>
          <div className="flex justify-between justify-between flex-row w-6/12">
            <h3 className="pl-2">skills:</h3>
            <input
              className="pl-2 border border-gray-700"
              defaultValue={props.person.details.skills}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
