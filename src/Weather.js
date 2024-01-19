import { useEffect, useState } from "react";
import cloudy from "./asset/cloudy.png"
import rainy from "./asset/rain.png"
import sun from "./asset/sun.png"
import './Weather.css'


const icon = {
    Clouds: cloudy,
    Rain: rainy,
    Clear: sun,
}
// function getDayOfWeekFromString(dateString) {
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dateObject = new Date(dateString);
    
//     if (isNaN(dateObject)) {
//       return 'Invalid Date';
//     }
    
//     const dayIndex = dateObject.getDay();
//     return daysOfWeek[dayIndex];
//   }

function WeatherCard({temp, main, date, data}) {
    
    const [clicked, setClicked] = useState(false);
    function handle() {
        setClicked(clicked ^ true);
    }
    var dropDownValue = <div></div>
    function handleDropDown(event) {
        var filteredData = data.filter()
    }
    return (
        <div className="weather--card">
            <div>
                {new Date(date).toLocaleDateString()}
            </div>
            <div>
                {new Date(date).toLocaleDateString('en-us', {weekday: 'long'})}
            </div>
            <img src={icon[main]}/>
            <div>
                {temp}&deg;C
            </div>
            <div className="weather--card__extra">
                {clicked ? dropDownValue : <div></div>}
            </div>
            <form action="#">
                <select onChange={handleDropDown}>
                    <option value='0'>none</option>
                    <option value='3'>3 hours</option>
                    <option value='6'>6 hours</option>
                </select>

            </form>
            
        </div>
    )
}
function Weather() {
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredDate] = useState([]);
    const temp = [0, 1, 2, 3, 4];
    useEffect(()=>{
        const fetchWeather = async()=>{
            try {
                const res = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=12.971599&lon=77.594566&appid=e39182f6789f4a68b2b890b761fad6d2");
                const data = await res.json();
                setWeatherData(data.list);
                if (data.list){
                    setFilteredDate(data.list.filter((item) => {
                        if ((item.dt - data.list[0].dt) % 86400 == 0) {
                            return true;
                        } 
                        return false;
                    }));
                }
     
            } catch(error) {
                console.log(error);
            }       
        } 
        fetchWeather();
    }, []);
    // const filteredData = weatherData.filter();
    // setWeatherData(filteredData);
    const listItems = filteredData.map((item, index) =>
        <WeatherCard temp={(item.main.temp - 273.15).toFixed(2)} 
        main={item.weather[0].main} date={item.dt_txt.split(' ')[0]} 
        data={weatherData} key={index}/>
      );
    // console.log(card);
    return (
        <div className="weather">
            {listItems}</div>
    );
}

export default Weather;