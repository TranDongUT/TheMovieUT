import React from 'react'
import MovieList from '../components/MovieList';

function Search() {

  return (
    <div className='movie'>
      <MovieList category="movie" type="search"/>
    </div>
  )
}

export default Search