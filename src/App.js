import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  const apiKey = '83dfc0b0f33f9729a4b794afe2a93ac9'
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName)
      return;

    const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    axios.get(apiURL).then((res) => {
      console.log("Response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("The error message is: ", err);
    })
  }

  useEffect(() => {
    getWeatherDetails("Delhi");
  }, [])

  const handleChangeInput = (e) => {
    console.log(e.target.value)
    setInputCity(e.target.value)
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }


  return (
    <div className='col-md-12'>
      <div className='weatherBg'>
        <h1 className='heading'>Weather App</h1>

        <div className='d-grid gap-3 col-4 mt-4'>
          <input type='text' className='form-control' placeholder='Enter a city...' value={inputCity} onChange={handleChangeInput} />
          <button className='btn btn-primary' type='button' onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className='col-md-12 text-center mt-5'>
        <div className='shadow rounded weatherResultBox'>
          <img className='weatherIcon' src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png' alt='icon.png'/>
          <h5 className='weatherCity'>{data?.name}</h5>
          <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
        </div>
      </div>

    </div>

  );
}

export default App;
