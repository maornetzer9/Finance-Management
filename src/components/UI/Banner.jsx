// src/components/Banner2/Banner2.jsx
import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { styles } from "../../styles/banner";
import { STATS } from "../../constants";

const Banner = () => {

    const isMobile = useMediaQuery("(max-width:687px)");

    return (
        <Box sx={styles.mainContainer}>
            {!isMobile ? (
                <>
                    <Box sx={styles.floatingBox1} />
                    <Box sx={styles.floatingBox2} />
                </>
            ) : null}

            <Container maxWidth="lg">
                <Box sx={styles.contentWrapper}>
                    <Box sx={styles.textContent}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={styles.mainTitle}
                        >
                            נהל את הכספים שלך
                            <br />
                            בצורה חכמה יותר
                        </Typography>
                        <Typography variant="h6" sx={styles.subtitle}>
                            פלטפורמה מתקדמת לניהול פיננסי המאפשרת לך לקבל
                            <br />
                            החלטות חכמות יותר עבור העתיד שלך
                        </Typography>
                    </Box>
                    <Box sx={styles.statsGrid}>
                        {STATS.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <Box key={index} sx={styles.statBox}>
                                    <IconComponent
                                        sx={
                                            stat.iconColor === "green"
                                                ? styles.greenIcon
                                                : styles.icon
                                        }
                                    />
                                    <Typography
                                        variant="h4"
                                        sx={styles.statValue}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={styles.statLabel}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Banner;