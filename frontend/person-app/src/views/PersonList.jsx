import React from 'react'
import ListRow from '../components/ListRow'

export default function PersonList() {
  let person = {firstname: "Firstname", lastname: "Lastname"}
  return (
    <>
      <ListRow person={person}></ListRow>
    </>
  )
}