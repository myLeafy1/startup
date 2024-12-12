import React, { useState } from 'react';
import '../global.css';
import { LOGIN } from './constants';
import { CAT_API_KEY } from './keys';

function Settings() {
  const [imageUrl,setImageURL] = useState("");
  const [imgEl, setImgEl]= useState();

  async function getCat(){
    await fetch("https://api.thecatapi.com/v1/images/search?limit=2", {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-api-key' : CAT_API_KEY
      },
    }).then((response) => response.json())
    .then((response) => {
      setImageURL(response[0].url);
      console.log(response)
    });;
    
    
    //https://api.thecatapi.com/v1/images/search
   

    if (imageUrl) {
      setImgEl(<img src={imageUrl} alt='cat' />);
    }
  }
  

  return (
    <div className="centered content">
        <p>Game settings:</p>
        <div>dummy game settings:
          <ul>
            <li>setting 1: difficulty</li>
            <li>setting 2: sound</li>
            <li>setting 3: graphics</li>
          </ul>
          <div id='picture' className='picture-box'>
          {imgEl}
        </div>
        </div>
        <button onClick={()=> getCat()}>get random cat</button>
        <button onClick={() => onButtonClick(LOGIN, "", true)}>logout</button>
    </div>
  );
}

export default Settings;