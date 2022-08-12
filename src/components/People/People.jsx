import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './People.module.css';

export default function People() {
  let [trendingPeople,setTrendingPeople] = useState([]);

  let baseImgUrl='https://image.tmdb.org/t/p/original/';
  async function getTrendingItems(mediaType, callback) {
        let {data} = await axios.get(
          `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
          );
        callback(data.results);
      }
      useEffect(() => {
        getTrendingItems('person',setTrendingPeople);
      }, []);
      

  return (
    <>
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
          <div key={person.id} className="col-md-2 my-2">
            <div className="person">
              <img className='w-100 mb-2' src={baseImgUrl+person.profile_path} alt='movie-poster'></img>
              <h2 className='h6'>{person.name}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
