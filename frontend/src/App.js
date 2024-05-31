import logo from './logo.svg';
import './App.css';
import ApplicationLogo from './components/ApplicationLogo';
import { createTheme, MantineProvider, Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import axios from "axios";

async function getWeather(){
  try{
    const response = await axios.get("http://localhost:8080/pingy")
    console.log(response);
  }catch(error){
    console.log(error);
    alert("Error loading data")
  }
}




function App() {

  

useEffect(()=> {
  getWeather();
})

  return (
    <MantineProvider>
      <ApplicationLogo/>
      <Grid justify='center' align='center'>
      <Grid.Col span={2}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/CityImages/lisbon.jpg"
          height={160}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Lisbon</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
      </Grid.Col>
      <Grid.Col span={2}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/CityImages/Leiria.jpg"
          height={160}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Leiria</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
      </Grid.Col>
      <Grid.Col span={2}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/CityImages/Coimbra.jpg"
          height={160}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Coimbra</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
      </Grid.Col>
      <Grid.Col span={2}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/CityImages/Porto.jpg"
          height={160}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Porto</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
      </Grid.Col>
      <Grid.Col span={2}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/CityImages/faro.jpg"
          height={160}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Faro</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
      </Grid.Col>
    </Grid>
    
    
    </MantineProvider>
  );
}

export default App;
