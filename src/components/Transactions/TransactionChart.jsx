import React, { useEffect, useRef } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Chart } from "chart.js/auto";
import { motion } from 'framer-motion';
import { headContentAnimation } from "../../utils/motion";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

export default function TransactionChart() {
    const { transactions, loading } = useSelector((state) => state.transactionsReducer);

    const isMobile = useMediaQuery("(max-width:687px)");

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    

    useEffect(() => {
        // Aggregate transactions by category
        const categoryTotals = transactions?.reduce((acc, transaction) => {
            const key = transaction.businessName; // Use a valid field here
            if (!key) return acc; // Skip if the key is undefined
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += parseFloat(transaction.amount);
            return acc;
        }, {});
        
        // Extract labels and data
        const labels = Object.keys(categoryTotals || {}); // Ensure a default empty object
        const data = Object.values(categoryTotals || {}); // Ensure a default empty object


        // Define colors for categories
        const backgroundColors = [
            "#6E5EF7", // Color for first category
            "#524AD0", // Color for second category
            "#FF6B8B", // Color for third category
            "#F6AD55", // Add more colors as needed
            "#68D391",
        ];

        const ctx = chartRef.current.getContext("2d");

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy the existing chart
        }

        // Create the chart
        chartInstanceRef.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: backgroundColors.slice(
                            0,
                            labels.length
                        ),
                        borderWidth: 0,
                        cutout: "85%", // Makes the doughnut thinner
                        spacing: 25, // Adds gaps between segments
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
                        display: true,
                        position: "left",
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: "circle",
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [transactions]); // Re-run effect when transactions change


    if(loading) return <Loader/>

    return (
        <motion.div {...headContentAnimation}>
            <Box 
                className="card" 
                sx={{ 
                    p: 3, 
                    bgcolor: "#fff", 
                    borderRadius: 2, 
                    height: transactions?.length === 0 || transactions === undefined ? '40px' : '100%',
                }}
            >
                <Typography mb={3} variant="h6">התפלגות עסקאות</Typography>

                <Box 
                    component={'div'}
                    sx={{ height: 300 }}
                >
                    <canvas ref={chartRef} />
                </Box>
            </Box>
        </motion.div>
    );
}
