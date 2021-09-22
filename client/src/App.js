import { useState, useEffect } from 'react'
import './App.css';
import axios from "axios";


function App() {
  const [movies, setMovies] = useState([
    {
      title: '',
      genre: '',
      year: ''
    }
  ])

  const [movie, setMovie] = useState(
    {
      title: '',
      genre: '',
      year: ''
    }
  )

  useEffect(() => {
    fetch('/movies').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setMovies(jsonRes))
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setMovie(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function addMovie(e) {
    e.preventDefault();
    alert("movie added")
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }
    axios.post('/newMovie', newMovie)
  }

  function deleteMovie(id) {
    axios.delete('/delete/' + id);
    alert("movie delte")
  }

  return (
    <div className="App">
      <div class="main">
        <div class="register">
          <h2>Add Data</h2>
          <form id="register">
            <label>First Name :</label>
            <br></br>
            <input onChange={handleChange} name="title" value={movie.title}></input>
            <br></br>
            <br></br>
            <label>Last Name :</label>
            <br></br>
            <input onChange={handleChange} name="genre" value={movie.genre}></input>
            <br></br>
            <br></br>
            <label>Your Age :</label>
            <br></br>
            <input onChange={handleChange} name="year" value={movie.year}></input>
            <br></br>
            <br></br>
            <button id="submit" onClick={addMovie}>ADD MOVIE</button>
          </form>
        </div>
      </div>

      {movies.map(movie => {
        return (
          <div class="table-container">
            <h1 class="heading">Data</h1>
            <table class="table">
            <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>#</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td data-lable="First Name">{movie.title}</td>
            <td data-lable="Last Name">{movie.genre}</td>
            <td data-lable="Age">{movie.year}</td>
            <td data-lable="#"><button onClick={() => deleteMovie(movie._id)}>DELETE</button></td>
            </tr>
            </tbody>
            </table>)
            </div>
          )
      })}
          </div>
        );
      }

export default App;
