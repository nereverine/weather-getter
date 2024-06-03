import {React, useEffect, useState} from "react"
import ApplicationLogo from "./ApplicationLogo";
import { useParams } from "react-router-dom";
import {MantineProvider, Grid, Title, Card, Paper, Text, Button, GridCol, Image, Badge, Accordion, AccordionControl, AccordionPanel} from "@mantine/core";
import axios from "axios";
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from "@mui/icons-material/Download";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompressIcon from '@mui/icons-material/Compress';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import { LineChart } from '@mantine/charts';
import { Line } from "recharts";


function WeatherDetails() {
    const {cityName} = useParams(); // receives params of the router
    const [weatherData, setWeatherData] = useState(null)
    const [forecastItems, setForecastItems] = useState(null) 


  
    const getDateHours = (epochTime) => {
        const date = new Date(epochTime*1000);
        return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
      }
    const getDate = (epochTime) =>   {
      const date = new Date(epochTime*1000)
      return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    }

      const getDateSun = (epochTime) =>{
        const date = new Date(epochTime*1000);
        return date.getHours().toString().padStart(2,'0')+":"+date.getMinutes().toString().padStart(2,'0')
      }

      const getWindDirection = (degrees) => { //converts degrees to cardinal direction
        if (degrees >= 0 && degrees <= 44) {
          return "North";
        } else if (degrees >= 45 && degrees <= 89) {
          return "Northeast";
        } else if (degrees >= 90 && degrees <= 134) {
          return "East";
        } else if (degrees >= 135 && degrees <= 179) {
          return "Southeast";
        } else if (degrees >= 180 && degrees <= 224) {
          return "South";
        } else if (degrees >= 225 && degrees <= 269) {
          return "Southwest";
        } else if (degrees >= 270 && degrees <= 314) {
          return "West";
        } else if (degrees >= 315 && degrees <= 359) {
          return "Northwest";
        }
      }
      const getUVColor = (index) => { //sets color of the badge based on the index
        if(index>=0 && index<3){
          return "green"
        }else if(index>=3 && index<6){
          return "yellow"
        }else if(index>=6 && index<8){
          return "orange"
        }else if(index>=8 && index<11){
          return "red"
        }else{
          return "purple"
        }
      }

      function ChartTooltip({ label, payload }) { //Custom tooltip for the chart
        if (!payload) return null;
      
        return (
          <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
              {label}
            </Text>
            {payload.map((item) => (
              <Text key={item.name} c={item.color} fz="sm">
                {item.name}: {item.value}
                
              </Text>
            ))}
          </Paper>
        );
      }

    async function getWeather(){
        try{
          const response = await axios.get("http://localhost:8080/weatherById/"+cityName)
          response.data.hourly.forEach(hour => { //this is to convert epoch time to hours for the line chart
            hour.dt = getDateHours(hour.dt)
            setForecastItems(response.data.daily.map((item) => (
              <Accordion.Item key={item.dt} value={item.dt.toString()}>
                <AccordionControl>
                  <Grid>
                    <Grid.Col span={4}>
                    {getDate(item.dt)}
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Grid>
                        <Grid.Col span={4}>
                    <Image 
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} style={{width:50}}
                   />
                   </Grid.Col>
                   <Grid.Col span={4}>
                   <ThermostatIcon style={{color:"lightblue"}}/>{Math.round(item.temp.min)}ºC
                   </Grid.Col>
                   <Grid.Col span={4}>
                    <ThermostatIcon style={{color:"red"}}/>{Math.round(item.temp.max)}ºC
                   </Grid.Col>
                   </Grid>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      {item.weather[0].description}
                    </Grid.Col>
                  </Grid>
                   </AccordionControl>
                   <AccordionPanel>
                   <Grid>
              <GridCol span={6}>
              <OpacityIcon style={{fontSize:30, verticalAlign:"middle"}}/>Humidity: {item.humidity}%
              </GridCol>
              <GridCol span={6} >
              <AirIcon style={{fontSize:30, verticalAlign:"middle"}}/>Wind: {item.wind_speed}m/s {getWindDirection(item.wind_deg)}
              </GridCol>
              <GridCol span={6}>
              <CompressIcon style={{fontSize:30, verticalAlign:"middle"}}/>Pressure: {item.pressure}hPa
              </GridCol>
              <GridCol span={6} >
              <WbSunnyIcon style={{fontSize:30, verticalAlign:"middle"}}/>UV Index: <Badge color={getUVColor(item.uvi)}>{Math.round(item.uvi)}</Badge>
              </GridCol>
              <GridCol span={6}>
              <WaterDropIcon style={{fontSize:30, verticalAlign:"middle"}}/>Dew Point: {item.dew_point}ºC
              </GridCol>
            </Grid>
                   </AccordionPanel>
              </Accordion.Item>
            )))
          }); 
          setWeatherData(response.data)
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
    
      if(!weatherData){
        return(
          <></>
        )
      }

return(
    <MantineProvider>
      <main>
        <ApplicationLogo />
<Title order={1} style={{textAlign:"center", marginBottom:10}}>{cityName}</Title>
        <Grid justify='center' align='center' style={{ width: '100%' }}>
          <Grid.Col span={4}>
          <Paper shadow="xl" withBorder p={2} style={{minHeight:150}}>
          <Text size='sm' c="dimmed">Last Updated At: {getDateHours(weatherData.current.dt)}</Text>
          <Grid justify='center' align='center' style={{ width: '100%' }}>
          <Grid.Col span={6}>
            <Title>{Math.round(weatherData.current.temp)}ºC</Title>
      Feels Like: {Math.round(weatherData.current.feels_like)}ºC
      </Grid.Col>
      <GridCol span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
      <Image 
        src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
        style={{width:50}}/>
        
        <Text style={{fontSize:25}} align="center">{weatherData.current.weather[0].description.charAt(0).toUpperCase()+weatherData.current.weather[0].description.slice(1)}</Text>
      </GridCol>
      </Grid>
    </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper shadow="xl" withBorder p={2} style={{minHeight:150}}>
              <Title>Daily Summary</Title>
              <Title order={5}>{getDate(weatherData.daily[0].dt)}</Title>
              <Grid justify="center" align="center">
                <Grid.Col span={6}>
              <UploadIcon style={{color:"orange"}}/> {getDateSun(weatherData.current.sunrise)}
              <DownloadIcon style={{color:"orange"}}/>{getDateSun(weatherData.current.sunset)}
              </Grid.Col>
              <Grid.Col span={6}>
              {weatherData.daily[0].summary}
              </Grid.Col>
              <Grid.Col span={6}>
              <ThermostatIcon style={{color:"lightblue", verticalAlign:"middle"}}/>{Math.round(weatherData.daily[0].temp.min)}ºC
              <ThermostatIcon style={{color:"red", verticalAlign:"middle"}}/>{Math.round(weatherData.daily[0].temp.max)}ºC
              </Grid.Col>
              <Grid.Col span={6}>
                <Grid>
                  <Grid.Col span={6}>
                <Text size="lg">Day: {Math.round(weatherData.daily[0].temp.day)}ºC</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                <Text size="lg">Night: {Math.round(weatherData.daily[0].temp.night)}ºC</Text>
                </Grid.Col>
                </Grid>
              </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper shadow="xl" withBorder p={10} style={{minHeight:150}}>
            <Grid>
              <GridCol span={6}>
              <OpacityIcon style={{fontSize:30, verticalAlign:"middle"}}/>Humidity: {weatherData.current.humidity}%
              </GridCol>
              <GridCol span={6} >
              <AirIcon style={{fontSize:30, verticalAlign:"middle"}}/>Wind: {weatherData.current.wind_speed}m/s {getWindDirection(weatherData.current.wind_deg)}
              </GridCol>
              <GridCol span={6}>
              <CompressIcon style={{fontSize:30, verticalAlign:"middle"}}/>Pressure: {weatherData.current.pressure}hPa
              </GridCol>
              <GridCol span={6} >
              <WbSunnyIcon style={{fontSize:30, verticalAlign:"middle"}}/>UV Index: <Badge color={getUVColor(weatherData.current.uvi)}>{Math.round(weatherData.current.uvi)}</Badge>
              </GridCol>
              <GridCol span={6} >
              <VisibilityIcon style={{fontSize:30, verticalAlign:"middle"}}/>Visibility: {weatherData.current.visibility/1000}km
              </GridCol>
              <GridCol span={6}>
              <WaterDropIcon style={{fontSize:30, verticalAlign:"middle"}}/>Dew Point: {weatherData.current.dew_point}ºC
              </GridCol>
            </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
        <Button onClick={teste}>teste</Button>
        <Grid>
          <Grid.Col span={6}>
            <Paper shadow="xl" withBorder p={10}>
              <Title order={2}>Next 2 days</Title>
              <LineChart data={weatherData.hourly} dataKey="dt" series={[{name:"temp", color:"blue.6"}]} tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }} h={350}/>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
          <Paper shadow="xl" withBorder p={10}>
          <Title order={2}>Forecast</Title>
          <Accordion variant="contained">
                {forecastItems}
          </Accordion>
            </Paper>
          </Grid.Col>
        </Grid>
      </main>
    </MantineProvider>

)

}

export default WeatherDetails;