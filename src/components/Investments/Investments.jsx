import { Box } from "@mui/material";
import React from "react";
import InvestmentChart from "./InvestmentChart";
import InvestmentHistoryChart from "./InvestmentHistoryChart";
import { motion } from "framer-motion";
import { headContentAnimation } from "../../utils/motion";

export default function Investments() {
    return (
        <motion.div {...headContentAnimation}>

        <Box
            component={"div"}
            display={{xs: 'column', md: 'flex'}}
            justifyContent={"center"}
            gap={1}
        >
                <InvestmentChart />
                <InvestmentHistoryChart />
        </Box>
        </motion.div>

    );
}
