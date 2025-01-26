import React,{useEffect, useRef,useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title,category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWE0M2FkNmViZjYzMTUxMDAwMWVhZDI0NGJiOGM0ZSIsIm5iZiI6MTczNzg3OTI4Ni42MjIwMDAyLCJzdWIiOiI2Nzk1ZWVmNjA5YzI1MmUzYWIyMzllNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rbddtb5arHDX30BFa4I0TmJtA-fB6MBMbPdkMoyr4_U'
    }
  };
  


  const handleWheel=(event)=>{
       event.preventDefault();
       cardsRef.current.scrollLeft +=event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
 
   cardsRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular On Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card,index)=>{
             return (
             <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
             </Link>)
          })}
        </div>
    </div>
  )
}

export default TitleCards