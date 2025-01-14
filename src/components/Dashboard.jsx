import React from "react";
import { Box } from "@mui/material";
import Investments from "./Investments/Investments";
import Assets from "./Assets/Assets";
import Footer from "./Footer";
import ErrorBoundary from "./UI/Error";
import Transactions from "./Transactions/Transactions";
import Banner from "./UI/Banner";

export default function Dashboard() {

    return (
        <>
            <Banner/>

            <Box 
                margin={"auto"}
                component={"div"} 
                width={{xs:"90%", md:"70%"}} 
            >
                <Transactions/>
                <Investments/>
                <ErrorBoundary>
                <Assets/>
                </ErrorBoundary>
                <Footer/>

            </Box>
        </>
    );
}