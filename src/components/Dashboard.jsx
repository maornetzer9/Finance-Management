import React from "react";
import { Box } from "@mui/material";
import Banner from "./UI/Banner";
import Investments from "./Investments/Investments";
import Assets from "./Assets/Assets";
import Footer from "./Footer";
import ErrorBoundary from "./UI/Error";
import Transactions from "./Transactions/Transactions";

export default function Dashboard() {

    return (
        <>
            <Banner />/

            <Box 
                margin={"auto"}
                component={"div"} 
                width={{xs:"90%", md:"70%"}} 
            >
                {/* <Expenses/> */}
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