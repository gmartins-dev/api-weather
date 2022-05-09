import axios from 'axios';
import React, { useEffect, useState } from 'react';
function App() {

//verifica e pega a localização do browser
const [location, setLocation] = useState(false);
//guarda os dados da api
const [weather, setWeather] = useState(false);

let getWeather = async (lat, long) => {
  let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
   
    params: { //parametros usados na chamada da api
      lat: lat,
      lon: long,
      appid: import.meta.env.VITE_OPEN_WHEATHER_KEY,
      lang: 'pt',
      units: 'metric'
    }
  });
  setWeather(res.data);
  console.log(res.data)
}

useEffect(()=> {
  navigator.geolocation.getCurrentPosition((position)=> {
    getWeather(position.coords.latitude, position.coords.longitude);
    setLocation(true)
  })
}, [])

  if (location == false) {
    return (
      <>
        Você precisa habilitar a localização no browser o/
      </>
    )
  } else if (weather == false) {
    return (
      <>
        Carregando o clima...
      </>
    )
  } else {
    return (
      <>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
      </>
    );
  }
}
export default App;