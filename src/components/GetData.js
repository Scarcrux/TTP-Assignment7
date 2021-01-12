import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import GifCard from './GifCard'

export default function GetData(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(props.url)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result["data"]);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

 function ZipList(items) {
  let cards = []
  if (items) {
    cards = items.map(item => {
      <GifCard img={item.images.fixed_width.url}
               title={item.title}
               url={item.url}
      />
    });
    } else {
      return <h1>Test</h1>
    }
    return cards
 }
 console.log(items)

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>{items && items.map((item, index) =>
        <GifCard img={item.images.fixed_width.url}
        id={index}
        title={item.title}
        url={item.url}
      />)
      }
      </div>
    );
  }
}