import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  let [trendingMovies,setTrendingMovies] = useState([]);
  let [trendingTvshows,setTrendingTvshows] = useState([]);
  let [trendingPeople,setTrendingPeople] = useState([]);
  let baseImgUrl='https://image.tmdb.org/t/p/original/';

  async function getTrendingItems(mediaType, callback) {
        let {data} = await axios.get(
          `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
          );
        callback(data.results);
      }
      let navigate = useNavigate();
      function goToDetails(id) {
        navigate({
          pathname:'/details',
          search:`?id=${id}`
        });
      }

      useEffect(() => {
        getTrendingItems('movie',setTrendingMovies);
        getTrendingItems('tv',setTrendingTvshows);
        getTrendingItems('person',setTrendingPeople);
      }, []);
      
  return (
    <>
      <div className={`${styles.header} text-center d-flex align-items-center justify-content-center`}>
        <h1>الحمد لله دايما.</h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className='text-muted'>most watched movies by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingMovies.map((movie)=>
          <div onClick={()=>goToDetails(movie.id)} key={movie.id} className={`${styles.pointer} col-lg-2 col-md-4 my-2`}>
            <div className="movie my-2 text-center position-relative">
              <div className={`${styles.rate} h6 d-flex justify-content-center align-items-center`}>
                {movie.vote_average}
              </div>
              <img className='w-100 mb-3' src={baseImgUrl+movie.poster_path} alt='movie-poster'></img>
              <h2 className='h6'>{movie.title}</h2>
            </div>
          </div>
        )}
      </div>
      <div className="row my-5">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='text-muted'>most watched tv shows by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingTvshows.map((tv)=>
          <div onClick={()=>goToDetails(tv.id)} key={tv.id} className={`${styles.pointer} col-lg-2 col-md-4 my-2`}>
            <div className="tv my-2 text-center position-relative">
              <div className={`${styles.rate} h6 d-flex justify-content-center align-items-center`}>
                {tv.vote_average}
              </div>
              <img className='w-100 mb-3' src={baseImgUrl+tv.poster_path} alt='movie-poster'></img>
              <h2 className='h6'>{tv.name}</h2>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>Trending</h2>
            <h2>Persons</h2>
            <h2>To watch now</h2>
            <p className='text-muted'>most watched Persons by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingPeople.map((person)=>
          <div onClick={()=>goToDetails(person.id)} key={person.id} className={`${styles.pointer} col-lg-2 col-md-4 my-2`}>
            <div className="person">
              <img className='w-100 mb-3' src={baseImgUrl+person.profile_path} alt='movie-poster'></img>
              <h2 className='h6'>{person.name}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
