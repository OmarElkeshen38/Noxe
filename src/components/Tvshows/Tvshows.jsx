import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Tvshows.module.css';

export default function Tvshows() {
  let [trendingTvshows,setTrendingTvshows] = useState([]);
  let baseImgUrl='https://image.tmdb.org/t/p/original/';
  
  async function getTrendingItems(mediaType, callback) {
        let {data} = await axios.get(
          `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
          );
        callback(data.results);
      }
      useEffect(() => {
        getTrendingItems('tv',setTrendingTvshows);
      }, []);

  return (
    <div className="row my-5">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} w-25`}></div>
            <h2>The best</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='text-muted'>most watched tv shows by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingTvshows.map((tv)=>
          <div key={tv.id} className="col-md-2 my-2">
            <div className="tv my-1 text-center position-relative">
              <div className={`${styles.rate} h6 d-flex justify-content-center align-items-center`}>
                {tv.vote_average}
              </div>
              <img className='w-100 mb-2' src={baseImgUrl+tv.poster_path} alt='movie-poster'></img>
              <h2 className='h6'>{tv.name}</h2>
            </div>
          </div>
        )}
      </div>
  );
}
