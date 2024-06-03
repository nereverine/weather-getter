import logo from './logo.svg';
import './App.css';
import ApplicationLogo from './components/ApplicationLogo';
import { createTheme, MantineProvider, Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import axios from "axios";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import Main from "./components/Main";
import '@mantine/charts/styles.css';



function App() {


  return (
    <MantineProvider>
   <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Main/>}></Route>
    <Route path="/details/:cityName" element={<WeatherDetails/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  </MantineProvider>
  );
 
}

export default App;
