package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"gopkg.in/validator.v2"
)

var socketConnections []*websocket.Conn

// Person defines a Person struct
type Person struct {
	ID          uuid.UUID `json:"id"`
	Firstname   string    `validate:"max=40" json:"firstname"`
	Lastname    string    `validate:"max=40" json:"lastname"`
	Age         int       `validate:"max=150" json:"age"`
	CreatedDate time.Time `json:"created_date"`
	Phonenumber string    `validate:"" json:"phonenumber"`
	Address     string    `validate:"max=40" json:"address"`
	Details     Details   `json:"details"`
}

// Details defines a Details struct
type Details struct {
	Department string   `validate:"max=40" json:"department"`
	Skills     []string `json:"skills"`
}

// People defines list of type Person
var people []Person

func createPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	for _, conn := range socketConnections {
		conn.WriteMessage(1, []byte("Created new person"))
	}
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)
	if errs := validator.Validate(person); errs != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(fmt.Sprintf("error: %d", errs))
		return
	}
	person.ID, _ = uuid.NewUUID()
	person.CreatedDate = time.Now()
	people = append(people, person)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(person)
}

func getPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	for _, conn := range socketConnections {
		conn.WriteMessage(1, []byte("requested a person"))
	}
	params := mux.Vars(r)
	id, _ := uuid.Parse(params["id"])
	for _, person := range people {
		if (person.ID) == id {
			json.NewEncoder(w).Encode(person)
			w.WriteHeader(http.StatusOK)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(Person{})
}

func getPeople(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(people)
}

func getPeopleSorted(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	for _, conn := range socketConnections {
		conn.WriteMessage(1, []byte("Requested list of people sorted"))
	}
	params := mux.Vars(r)
	sortedList := people

	switch params["sort"] {
	case "alphabetically":
		sort.Slice(sortedList, func(i, j int) bool {
			switch strings.Compare(sortedList[i].Lastname, sortedList[j].Lastname) {
			case -1:
				return true
			case 1:
				return false
			}
			return true
		})
	case "numerically":
		sort.Slice(sortedList, func(i, j int) bool {
			return sortedList[i].Age < sortedList[j].Age
		})
	case "by_time":
		sort.Slice(sortedList, func(i, j int) bool {
			return sortedList[i].CreatedDate.Before(sortedList[j].CreatedDate)
		})
	default:
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(sortedList)
}

//TODO - Refactor
func updatePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	for _, conn := range socketConnections {
		conn.WriteMessage(1, []byte("Updated a person"))
	}
	params := mux.Vars(r)
	id, _ := uuid.Parse(params["id"])
	found := false
	createdDate := time.Now()
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)

	for index, personToRemove := range people {
		if personToRemove.ID == id {
			people = append(people[:index], people[index+1:]...)
			createdDate = personToRemove.CreatedDate
			found = true
			break
		}
	}

	if errs := validator.Validate(person); errs != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(fmt.Sprintf("error: %d", errs))
		return
	}

	if found {
		person.ID = id
		person.CreatedDate = createdDate
		w.WriteHeader(http.StatusOK)
		people = append(people, person)
		json.NewEncoder(w).Encode(people)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	return

}

func deletePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	for _, conn := range socketConnections {
		conn.WriteMessage(1, []byte("Deleted a person"))
	}
	params := mux.Vars(r)
	id, _ := uuid.Parse(params["id"])
	found := false
	for index, person := range people {
		if person.ID == id {
			people = append(people[:index], people[index+1:]...)
			found = true
			break
		}
	}

	if found {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(people)
	} else {
		w.WriteHeader(http.StatusNotFound)
	}

}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	// upgrade this connection to a WebSocket
	// connection
	ws, err := upgrader.Upgrade(w, r, nil)
	socketConnections = append(socketConnections, ws)
	if err != nil {
		log.Println(err)
	}
	log.Println("Client Connected")

}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/person", createPerson).Methods("POST")
	r.HandleFunc("/person/{id}", getPerson).Methods("GET")
	r.HandleFunc("/person", getPeople).Methods("GET")
	r.HandleFunc("/person/sorted/{sort}", getPeopleSorted).Methods("GET")
	r.HandleFunc("/person/{id}", deletePerson).Methods("DELETE")
	r.HandleFunc("/person/{id}", updatePerson).Methods("PUT")
	r.HandleFunc("/ws", wsEndpoint)
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "DELETE"}), handlers.AllowedOrigins([]string{"*"}))(r)))

}
