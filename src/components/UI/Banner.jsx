import React from "react";
import { Box } from "@mui/material";
import Cover from "../../assets/Banner.webp";

export default function Banner() {
    return (
        <Box component={'div'}>
        <Box
            component="img"
            src={Cover}
            sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "600px" },
                objectFit: "fit",
                objectPosition: "center",
            }}
            alt="Website Banner"
        />
        </Box>
    );
}
