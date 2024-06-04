import React from "react";
import { Center, Paper, Title, TextInput, PasswordInput, Button } from "@mantine/core";

function Login(){

    const login= () =>{
        console.log("test")
    }

    return(
        <main>
            <Center>
                <Paper shadow="xl" style={{marginTop:100, width:250, padding:20}}>
                    <Title style={{fontWeight:"lighter", fontSize:50}}>Login</Title>
                    Username: <TextInput></TextInput>
                    Password: <PasswordInput></PasswordInput>
                    <Center>
                    <Button variant="filled" color="indigo" onClick={login} style={{width:200, marginTop:20}}>Login</Button>
                    </Center>
                    <Center>
                    <Button variant="filled" color="gray" style={{width:200, marginTop:20}}>Register</Button>
                    </Center>
                </Paper>
            </Center>
        </main>
    )
}


export default Login