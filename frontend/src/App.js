import './App.css';
import { MantineProvider} from '@mantine/core';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import Main from "./components/Main";
import NotFound from './components/NotFound';
import Login from './components/Auth/Login';
import '@mantine/charts/styles.css';



function App() {


  return (
    <MantineProvider>
   <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Main/>}></Route>
    <Route path="/details/:cityName" element={<WeatherDetails/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  </MantineProvider>
  );
 
}

export default App;
