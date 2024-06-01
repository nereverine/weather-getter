import React from "react";
import { Title } from "@mantine/core";

function ApplicationLogo() {
    return (
      <main>
        <a href="/">
        <Title order={1} style={{display:"flex", justifyContent:"center", backgroundColor:"gray"}}>
            Weather Getter
        </Title>
        </a>
      </main>
    );
  }
  
  export default ApplicationLogo;
  