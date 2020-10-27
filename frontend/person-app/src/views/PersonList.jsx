import React, { useState } from "react";
import axios from "axios";
import ListRow from "../components/ListRow";

export default function PersonList() {
  const [people, setPeople] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const loadPerson = () => {
    if (!loaded) {
      axios.get("http://localhost:8000/person")
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

  return (
    <div>
      {loadPerson()}
      {people.map((e) => {
        return <ListRow key={e.id} person={e}></ListRow>
      })}
    </div>
  );
}
