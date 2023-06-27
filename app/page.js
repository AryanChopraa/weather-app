"use client"
import {useEffect, useState} from "react";
import axios from "axios";

const Api_key = "895284fb2d2c50a520ea537456963d9c";

const App = () => {
 
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
   
      
      return true;

  
      
    }
  }

 

   
  const fetchWeather = async () => {
        try{
          setLoading(true);
          const URL = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${Api_key}`;
          const response = await axios.get(URL);

          const data = response.data;
          setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          ));
  

          setApiData(data);
          setLoading(false);
        }
        catch(err){
          console.log("Location Not Found");
          setLoading(false);
          setApiData(null);
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },]);
        }
      }

  

  

  


  return (
    <div className="background-img h-screen grid place-items-center">
      <div className="bg-white bg-opacity-50 w-96 p-4 rounded-md shadow-2xl">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Enter Your Location"
            className="text-xl border-b
          p-1 border-gray-200 font-semibold capitalize flex-1 rounded-sm focus:outline-none"
          />
         <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="..."
              className="w-8 ml-4"
            />
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden 
         ${showWeather ? "h-[32rem]" : "h-0"}`}
  
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData.name + "," + apiData.sys.country}
                  </p>
                )}
                <img
                  src={showWeather[0].img}
                  alt="..."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0].type}
                </h3>

                {apiData && (
                  <>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="..."
                        className="h-9 mt-1"
                      />
                      <h2 className="text-3xl font-extrabold ">
                          {apiData.main.temp}&#176;C
                        </h2>
                    </div>
                    <div className="flex justify-center">
                    <img width="30" height="30" src="https://img.icons8.com/ios/30/dew-point.png" alt="dew-point" className="mr-2"/>
                        <h2 className="text-xl font-extrabold ">
                            {apiData.main.humidity} %
                          </h2>
                      </div>
                      <div className="flex justify-center">
                      <img width="30" height="30" src="https://img.icons8.com/ios/30/wind--v1.png" alt="wind--v1" className="mr-2"/>
                          <h2 className="text-xl font-extrabold ">
                              {apiData.wind.speed} m/s
                            </h2>
                        </div>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
