import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Box, Button, Typography } from "@mui/material";
import Modal from "../UI/Modal";
import { motion } from "framer-motion";

export default function InvestmentChart() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Investment data
    const [investmentData, setInvestmentData] = useState([
        { category: "מניות", amount: 60, color: "#7B5CFF" },
        { category: "אגרות חוב", amount: 40, color: "#4F3DCA" },
    ]);

    const togglePopup = () => setIsModalOpen((prev) => !prev);

    const updateChart = () => {
        if (chartInstanceRef.current) 
        {
            chartInstanceRef.current.data.labels = investmentData.map(
                (item) => item.category
            );
            chartInstanceRef.current.data.datasets[0].data = investmentData.map(
                (item) => item.amount
            );
            chartInstanceRef.current.data.datasets[0].backgroundColor =
                investmentData.map((item) => item.color);
            chartInstanceRef.current.update();
        }
    };

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        chartInstanceRef.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                categorys: investmentData.map((item) => item.category),
                datasets: [
                    {
                        data: investmentData.map((item) => item.amount),
                        backgroundColor: investmentData.map((item) => item.color),
                        borderWidth: 0,
                        cutout: "85%",
                        spacing: 5,
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
                        categorys: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: "circle",
                            font: {
                                family: "Assistant",
                                size: 14,
                            },
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
    }, []);

    useEffect(() => {
        updateChart();
    }, [investmentData]);

    const addInvestment = (category, amount, color) => {
        setInvestmentData((prev) => [...prev, { category, amount, color }]);
    };
    
    return (
        <Box 
            component={"div"} 
            className="card" 
            width={{xs:"95%", md:'40%',}}
            mt={5} 
        >
            <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 500,
                        color: "#2D3748",
                    }}
                >
                    סקירת השקעות
                </Typography>

                <Button
                    className="button"
                    variant="contained"
                    onClick={togglePopup}
                    sx={{
                        background:
                            "linear-gradient(to right, #4f46e5, #7c3aed)",
                    }}
                >
                    הוסף השקעה
                </Button>
            </Box>

            <Box
                sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 3,
                        fontWeight: 500,
                        color: "#2D3748",
                    }}
                >
                    הקצאת תיק השקעות
                </Typography>

                <Box
                    component={'div'}
                    sx={{ height: 300, position: "relative" }}
                >
                    <canvas ref={chartRef} />
                </Box>

                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={'הוסף השקעה חדשה'}
                    onSubmit={(newData) => {
                        const { category, amount, color } = newData;
                        addInvestment(category, amount, color);
                        setIsModalOpen(false);
                    }}
                />
            </Box>
        </Box>
    );
}