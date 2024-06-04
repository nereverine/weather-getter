import React from "react";
import { Center, Title } from "@mantine/core"
import ApplicationLogo from "./ApplicationLogo";

function NotFound () {



    return(
        <main>
        <ApplicationLogo/>
        <Center>
            <Title>
                Page Not Found
            </Title>
        </Center>
        </main>
    )
}

export default NotFound