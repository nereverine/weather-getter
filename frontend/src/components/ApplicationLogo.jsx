import React from "react";
import { Title } from "@mantine/core";
import { Link } from "react-router-dom";

function ApplicationLogo() {
    return (
      <main style={{display:"flex", justifyContent:"center", backgroundColor:"gray"}}>     
        <Title component={Link} to="/" order={1}>
            Weather Getter
        </Title>
      </main>
    );
  }
  
  export default ApplicationLogo;
  