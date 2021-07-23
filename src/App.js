import React, {Component} from 'react';
import Form from './components/Form';
import Weather from './components/Weather';



const ApiKey = "b2a53548ccfebb1cc7db1abd492338cb";

// https://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44

class App extends Component {

  state = {
    temperature:"",
    city:"",
    country:"",
    humidity:"",
    description:"",
    error:""
  }


  getWeather = async (e) => {

    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

     
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${ApiKey}`)
    const data = await api.json();
    

    if (city && country) {
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""
    
      })
  
    } else {
      this.setState({
        temperature:"",
        city:"",
        country:"",
        humidity:"",
        description:"",
        error:"Please Entre Data"
    
      })
    }
    
  }
  

  render() { 
    return ( 
      <div className='wrapper'>
        <div className='form-container '>

       <Form  getWeather={this.getWeather} />
       <Weather
 
         temperature={this.state.temperature}
         city={this.state.city}
         country={this.state.country}
         humidity={this.state.humidity}
         description={this.state.description}
         error={this.state.error}

       />
        </div>
      </div>
     );
  }
}
 
export default App;