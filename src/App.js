import React, {Fragment, useEffect, useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Movie from './components/Movie'

// Generate genre
const genres = [
{ "id": "", "name": "All" },
{ "id": 28, "name": "Action" },
{ "id": 12, "name": "Adventure" },
{ "id": 16, "name": "Animation" },
{ "id": 35, "name": "Comedy" },
{ "id": 80, "name": "Crime" },
{ "id": 99, "name": "Documentary" },
{ "id": 18, "name": "Drama" },
{ "id": 10751, "name": "Family" },
{ "id": 14, "name": "Fantasy" },
{ "id": 36, "name": "History" },
{ "id": 27, "name": "Horror" },
{ "id": 10402, "name": "Music" },
{ "id": 9648, "name": "Mystery" },
{ "id": 10749, "name": "Romance" },
{ "id": 878, "name": "Science Fiction" },
{ "id": 10770, "name": "TV Movie" },
{ "id": 53, "name": "Thriller" },
{ "id": 10752, "name": "War" },
{ "id": 37, "name": "Western" }
];

let years = []
const thisYear = new Date().getFullYear();
for (var i = 0; i < 10; i++) {
  years.push(thisYear - i)
}



function App() {
  const [movies, setMovies] = useState([])
  const [year, setYear] = useState(thisYear)
  const [genreId, setGenreId] = useState("")
  const [genreName, setGenreName] = useState("All")
  const [page, setPage] = useState(1)




  const handleYearChange = (e) => {
    setYear(e.target.value)
    setPage(1)
  }

  const handleGenreChange = (e) => {
    setGenreId(e.target.value)

    let index = e.target.selectedIndex
    setGenreName(e.target[index].text)

    setPage(1)
  }

  const handleLoadMoreClick = () => {
    setPage(prevState => {
      return prevState + 1
    })
  }

  useEffect(()=>{
    const myFetch = async () => {
      try {
        let url = "https://api.themoviedb.org/3/discover/movie?api_key=d28faebfb13bf1eb864a89399f16c536";
        url += "&sort_by=popularity.desc"
        url += "&certification_country=US"
        url += "&certification.lte=PG-13"
        url += "&include_adult=false"
        url += "&include_video=false"
        url += "&page="+ page
        url += "&with_watch_monetization_types=flatrate"
        url += `&primary_release_year=${year}`;
        url += `&with_genres=${genreId}`
        url += `&with_keywords=one`

        console.log(url)


        let response = await fetch(url)
        if (!response.ok) {
          throw new Error('Database tidak dapat diakse')
        }
        let data = await response.json()

        if (page == 1) {

          setMovies(data.results)      
        }else {
          setMovies((prevMovie) => {
            return [...prevMovie, ...data.results]
          })
        }
      } catch (e) {
        console.log(e)
      } 
    }
    myFetch()


  }, [year, genreId, page])


  return (
    <Fragment>
    <Header />
    
    <nav>
    <div className="container text-white">
    <div className="row">
    <div className="col d-none d-md-flex align-items-center">
    <hr className="flex-grow-1 me-3" />
    </div>
    <div className="col col-md-3 d-flex">
    <div className="me-3">
    <label htmlFor="year" className="form-label">Year</label>
    <select className="form-select" onChange={handleYearChange}
    value={year} id="year">
    {
      years.map((year) =>
        <option key={year.toString()} value={year}>
        {year}
        </option>)
    }
    </select>
    </div>
    <div>
    <label htmlFor="genre" className="form-label">Genre</label>
    <select className="form-select" onChange={handleGenreChange}
    value={genreId} id="genre">
    {
      genres.map((genre) =>
        <option key={genre.id} value={genre.id}>
        {genre.name}
        </option>)
    }
    </select>
    </div>
    </div>
    </div>
    </div>
    </nav>

    <main className="pb-5">
    <div className="container">
    <h2 className="py-5 text-white text-center">
    {`Best Movie ${year}, Genre: ${genreName}`}
    </h2>
    <div className="row">
    {
      movies.map(movie => <Movie key={movie.id} movie={movie} />)
    }
    </div>

    <div className="row">
    <div className="col text-center">
    <button className="btn btn-dark" onClick={handleLoadMoreClick}>
    Load More...
    </button>
    </div>
    </div>


    </div>
    </main>
    <Footer />
    </Fragment>
    );
}

export default App;
