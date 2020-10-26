package main

import (
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// Person defines a Person struct
type Person struct {
	ID          uuid.UUID `json:"id,omitempty"`
	Firstname   string    `validator:"max=40,nonzero" json:"firstname,omitempty"`
	Lastname    string    `validator:"max=40,nonzero" json:"lastname,omitempty"`
	Age         int       `validator:"max=150" json:"age,omitempty"`
	CreatedDate time.Time `json:"created_date,omitempty"`
	Phonenumber string    `validator:"nonzero" json:"phonenumber,omitempty"`
	Address     string    `validator:"max=40,nonzero" json:"address,omitempty"`
	Details     Details   `json:"details,omitempty"`
}

// Details defines a Details struct
type Details struct {
	Department string   `validator:"max=40,nonzero" json:"department,omitempty"`
	Skills     []string `json:"skills,omitempty"`
}

// People defines list of type Person
var People []Person

func createPerson(http.ResponseWriter, *http.Request) {

}

func getPerson(http.ResponseWriter, *http.Request) {

}

func getPeople(http.ResponseWriter, *http.Request) {

}

func deletePerson(http.ResponseWriter, *http.Request) {

}

func updatePerson(http.ResponseWriter, *http.Request) {

}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/person", createPerson).Methods("POST")
	r.HandleFunc("/person/{id}", getPerson).Methods("GET")
	r.HandleFunc("/person", getPeople).Methods("GET")
	r.HandleFunc("/person/{id}", deletePerson).Methods("DELETE")
	r.HandleFunc("/person/{id}", updatePerson).Methods("PUT")
	log.Fatal(http.ListenAndServe(":8000", r))
}
