import ApplicationLogo from "./ApplicationLogo"
import { createTheme, MantineProvider, Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import axios from "axios";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import WeatherDetails from "./WeatherDetails"


const getDate = (epochTime) => {
  const date = new Date(epochTime*1000);
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
}


function Main() {
  const [weatherData, setWeatherData] = useState([])
  async function getWeather(){
    try{
      const response = await axios.get("http://localhost:8080/weathers")
      setWeatherData(Object.values(response.data))
      console.log(response);
    }catch(error){
      console.log(error);
      alert("Error loading data")
    }
  }

useEffect(()=> {
  getWeather();
}, []);

  return (
    <MantineProvider>
      <ApplicationLogo/>
      <Grid justify='center' align='center'>  
    {weatherData.map(function(city){
      return(
        <Grid.Col span={2} key={city.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`/CityImages/${city.name.toLowerCase()}.jpg`}
          height={160}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{city.name}</Text>
        <Badge color="pink" size="xl">{Math.round(city.main.temp)}ºC</Badge>
      </Group>
      <Text size='sm' c="dimmed">Last Updated At: {getDate(city.dt)}</Text>
      <Grid justify='center' align='center'>  
      <Grid.Col span={6}>
      <Image
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
        style={{width:50}}/>
      </Grid.Col>
      <Grid.Col span={6}>
      <Text>{city.weather[0].description.charAt(0).toUpperCase()+city.weather[0].description.slice(1)}</Text>
      </Grid.Col>
      </Grid>
      <Text>
       Feels like {Math.round(city.main.feels_like)}ºC
      </Text>
    
      <Button component={Link} to={`/details/${city.name}`}color="blue" fullWidth mt="md" radius="md">
        Details
      </Button>
  
      
    </Card>
      </Grid.Col>
        
      )
    })}
    </Grid>
    </MantineProvider>


    

  );
 
}

export default Main;
