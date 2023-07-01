import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function People() {

  let [trendingPeople,setTrendingPeople] = useState([]);
  let [loading,setLoading] = useState(false);

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';

  async function getTrendingItems(mediaType, callback) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=b116c6cff13d226f2cb7a9a6253b930b`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE2YzZjZmYxM2QyMjZmMmNiN2E5YTYyNTNiOTMwYiIsInN1YiI6IjYyOTc2OWNlNTUwN2U5MTQ5MjVlZTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r7hptV2G5FwzNnzGQ_3NWcvBHuIeWOL7d7lBYuh5IHY'
      }
    })
    callback(data.results);
    setLoading(false);
  }
  
  useEffect(() => {
    getTrendingItems('movie', setTrendingPeople);
    
  }, []);

  return (
    <>
      <div className="container">
        {loading ? 
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <i className='fa fa-spinner fa-spin h1 text-white'></i>
          </div>
        : 
          <>
            <div className="row my-4">
            {trendingPeople.map((person) =>
              <div key={person.id} className="col-md-3 col-lg-2 my-2">
                <div className="person">
                  <img className='w-100 mb-2' src={baseImgUrl+person.profile_path} alt="" />
                  <h2 className='h5'>{person.name}</h2>
                </div>
              </div>
            )}
          </div>
          </>
        }
      </div>
    </>
  );
}
