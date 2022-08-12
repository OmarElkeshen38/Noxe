import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Movies.module.css';

export default function Movies() {
  let [trendingMovies,setTrendingMovies] = useState([]);
  let baseImgUrl='https://image.tmdb.org/t/p/original/';

  async function getTrendingItems(mediaType, callback) {
        let {data} = await axios.get(
          `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
          );
        callback(data.results);
      }
      useEffect(() => {
        getTrendingItems('movie',setTrendingMovies);
      }, []);
      
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>The best</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className='text-muted'>most watched movies by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingMovies.map((movie)=>
          <div key={movie.id} className="col-md-2 my-2">
            <div className="movie">
              <img className='w-100 mb-2' src={baseImgUrl+movie.poster_path} alt='movie-poster'></img>
              <h2 className='h6'>{movie.title}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
