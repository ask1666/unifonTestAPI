import React, { useState } from "react";
import axios from "axios";
import ListRow from "../components/ListRow";
import AddPerson from "../components/AddPerson";

export default function PersonList() {
  const [people, setPeople] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [AddPersonToggle, setAddPersonToggle] = useState(false);

  const loadPeople = () => {
    if (!loaded) {
      axios
        .get("http://localhost:8000/person")
        .then((res) => {
          const people = res.data;
          setPeople(people);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoaded(!loaded);
    }
  };

  const reloadPeople = () => {
    setLoaded(false);
  };

  const DisplayAddPerson = () => {
    if (AddPersonToggle)
      return (
        <AddPerson
          HandleAddpersonToggle={HandleAddpersonToggle}
          reloadPeople={reloadPeople}
        ></AddPerson>
      );
    else return "";
  };

  const HandleAddpersonToggle = () => {
    setAddPersonToggle(!AddPersonToggle);
  };

  return (
    <div>
      <div className="py-4 flex justify-center">
        <button
          onClick={HandleAddpersonToggle}
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
        >
          Add Person
        </button>
      </div>
      <div className="py-4">{DisplayAddPerson()}</div>
      {loadPeople()}
      {people && people.length ? (
        people.map((e) => {
          return (
            <ListRow
              reloadPeople={reloadPeople}
              key={e.id}
              person={e}
            ></ListRow>
          )})) : (
        <h1 className="text-center text-2xl pt-5 font-medium">
          No people here
        </h1>
      )}
    </div>
  );
}
