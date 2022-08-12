import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
 
export default function Details() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [details,setDetails] = useState({});
  let currentId = searchParams.get('id');
  let baseImgUrl='https://image.tmdb.org/t/p/original/';

  async function getTrendingDetails(mediaType) {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${currentId}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-us`
          );
          setDetails(data);
      }

  useEffect(() => {
        getTrendingDetails('movie');
        getTrendingDetails('tv');
        getTrendingDetails('person');
      }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <img className='w-100 my-2' src={baseImgUrl + details.poster_path} alt="" />
        </div> 
        <div className="col-md-8 my-5 d-flex flex-column justify-content-center gap-2">
          <h1 className='fw-bold'>{details.title}</h1>
          <h1 className='fw-bold'>{details.name}</h1>
          <div className="d-flex w-50 justify-content-between">
            <h3 className='h6 border p-1'>{details.release_date}</h3>
            <h3 className='h6 border p-1'>{details.vote_average} / 10</h3>
          </div>
          <h4 className='text-white-50'>{details.tagline}</h4>
          <h2 className='fw-bold mt-3'>overview</h2>
          <h2 className='h5'>{details.overview}</h2>
        </div> 
      </div>
    </>
  );
}
