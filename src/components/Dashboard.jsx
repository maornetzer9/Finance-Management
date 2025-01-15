import React from "react";
import { Box } from "@mui/material";
import Investments from "./Investments/Investments";
import Assets from "./Assets/Assets";
import Footer from "./Footer";
import ErrorBoundary from "./UI/Error";
import Transactions from "./Transactions/Transactions";
import Banner from "./UI/Banner";
import Navbar from "./UI/Navbar";

export default function Dashboard() {

    return (
        <>
            <Banner/>

            <Navbar/>
            <Box 
                margin={"auto"}
                component={"div"} 
                width={{xs:"90%", md:"70%"}} 
            >
                <ErrorBoundary>
                <Transactions/>
                <Investments/>
                <Assets/>
                <Footer/>
                </ErrorBoundary>

            </Box>
        </>
    );
}