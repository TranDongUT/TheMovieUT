import React from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList';

function Catalog() {
  const {category} = useParams();

  return (
    <div className='movie'>
      <MovieList category={category}/>
    </div>
  )
}

export default Catalog