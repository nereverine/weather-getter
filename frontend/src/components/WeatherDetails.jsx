import {React, useEffect, useState} from "react"
import ApplicationLogo from "./ApplicationLogo";
import { useParams } from "react-router-dom";
import {MantineProvider, Grid, Title, Card, Paper, Text, Button} from "@mantine/core";
import axios from "axios";




function WeatherDetails() {
    const {cityName} = useParams(); // receives params of the router
    const [weatherData, setWeatherData] = useState({})

    const getDate = (epochTime) => {
        const date = new Date(epochTime*1000);
        return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
      }


    async function getWeather(){
        try{
          const response = await axios.get("http://localhost:8080/weatherById/"+cityName)
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

      const teste=() =>{
        console.log(weatherData)
      }
    
return(
    <MantineProvider>
      <main>
        <ApplicationLogo />
<Title order={1} style={{textAlign:"center", marginBottom:10}}>{cityName}</Title>
        <Grid justify='center' align='center' style={{ width: '100%' }}>
          <Grid.Col span={4}>
          <Paper shadow="xl" withBorder p={2}>
          <Text size='sm' c="dimmed">Last Updated At: {getDate(weatherData[4].dt)}</Text>
      <Title order={2}>Current Weather</Title>
      
    </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <div style={{ textAlign: 'center' }}>2</div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div style={{ textAlign: 'center' }}>3</div>
          </Grid.Col>
        </Grid>
        <Button onClick={teste}>teste</Button>
      </main>
    </MantineProvider>

)

}

export default WeatherDetails;