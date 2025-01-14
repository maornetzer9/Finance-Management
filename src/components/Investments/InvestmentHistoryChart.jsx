import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, MenuItem, Grid } from "@mui/material";
import { investmentData, YEARS } from "../../constants";
import { Chart } from "chart.js/auto";

export default function InvestmentHistoryChart() {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [selectedYear, setSelectedYear] = useState("2024");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Filter data based on selected year
        const filtered = investmentData.filter((entry) => entry.monthYear.startsWith(selectedYear));
        setFilteredData(filtered);
    }, [selectedYear]);

    useEffect(() => {
        if (filteredData.length === 0) return;

        const ctx = chartRef.current.getContext("2d");

        // Create gradient fills
        const purpleGradient = ctx.createLinearGradient(0, 0, 0, 400);
        purpleGradient.addColorStop(0, "rgba(123, 92, 255, 0.4)");
        purpleGradient.addColorStop(1, "rgba(123, 192, 255, 0.2)");

        const darkPurpleGradient = ctx.createLinearGradient(0, 0, 0, 400);
        darkPurpleGradient.addColorStop(0, "rgba(79, 61, 202, 0.4)");
        darkPurpleGradient.addColorStop(1, "rgba(19, 261, 102, 0.2)");

        // Extract labels and datasets dynamically
        const labels = filteredData.map((entry) => entry.monthYear);
        const stockData = filteredData.map((entry) => entry.stocks);
        const bondData = filteredData.map((entry) => entry.bonds);

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "מניות",
                        data: stockData,
                        borderColor: "#7B5CFF",
                        backgroundColor: purpleGradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                    },
                    {
                        label: "אגרות חוב",
                        data: bondData,
                        borderColor: "#0372cb",
                        backgroundColor: darkPurpleGradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000, // Adjust for smoother animations
                    easing: "easeInOutQuart", // Smooth easing
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 20,
                            font: {
                                family: "Assistant",
                                size: 14,
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        },
                        ticks: {
                            font: {
                                family: "Assistant",
                            },
                        },
                    },
                    y: {
                        position: "right",
                        border: {
                            display: false,
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.05)",
                        },
                        ticks: {
                            font: {
                                family: "Assistant",
                            },
                        },
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [filteredData]);

    return (
        <Box component={"div"} className="card" mt={5} width={{xs: '95%', md:"60%",}}>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 500,
                    color: "#2D3748",
                }}
            >
                הסטורית השקעות
            </Typography>

            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Select Year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        fullWidth
                    >
                        {YEARS.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Box
                component={'div'}
                sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Box
                    sx={{
                        height: 400,
                        position: "relative",
                    }}
                >
                    <canvas ref={chartRef} />
                </Box>
            </Box>
        </Box>
    );
}