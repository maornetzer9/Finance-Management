import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Add as AddIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from "@mui/icons-material";
import { BUTTON_STYLES, FORM_FIELDS } from "../../constants";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAssetsAction, newAssetAction } from "../../action/assets";
import { useLocalError } from "../../hooks/error";
import ErrorBoundary from "../UI/Error";
import AssetTable from "./AssetsTable";
import Loader from "../UI/Loader";
import ReusableModal from "../ReusableModal";

const Assets = () => {
    const dispatch = useDispatch();
    const { setLocalError } = useLocalError();
    const { summary, loading } = useSelector((state) => state.assetsReducer, shallowEqual);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const newAsset = async (formData) => {
        const { code, message } = await dispatch(newAssetAction(formData));
        if (code !== 200) setLocalError(message);
    };

    const loadingAssets = useCallback(async () => {
        await dispatch(getAssetsAction());
    }, [dispatch]);

    useEffect(() => { loadingAssets(); }, [loadingAssets]);

    if (loading) return <Loader />;

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #E2E8F0",
                    mb: 4,
                    pb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#1E293B", fontSize: "1.75rem" }}
                >
                    ניהול נכסים
                </Typography>
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    className="button"
                    sx={BUTTON_STYLES}
                >
                    הוסף נכס
                </Button>
            </Box>

            {/* Summary Cards */}
            {summary && (
                <Box
                    display="flex"
                    gap={2}
                    mb={2}
                    sx={{ justifyContent: "space-between" }}
                >
                    {summary?.summaryCards?.map((card, index) => (
                        <Paper
                            key={index}
                            elevation={2}
                            sx={{
                                borderRadius: 2,
                                textAlign: "center",
                                flex: 1,
                                bgcolor: "#F8FAFC",
                                color: card.color,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {card.label}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "18px", md: "24px", xl: "30px" } }}
                            >
                                {card.value}
                            </Typography>
                            {card.trend === "up" ? (
                                <TrendingUpIcon sx={{ fontSize: 32, color: "#10B981" }} />
                            ) : (
                                <TrendingDownIcon sx={{ fontSize: 32, color: "#EF4444" }} />
                            )}
                        </Paper>
                    ))}
                </Box>
            )}

            {/* New Asset Modal */}
            <ReusableModal
                title={"הוסף נכס חדש"}
                isModalOpen={isModalOpen}
                inputFields={FORM_FIELDS}
                setIsModalOpen={setIsModalOpen}
                onSubmit={newAsset}
                mode="create" 
            />

            {/* Table */}
            <Box
                sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    border: "1px solid #E2E8F0",
                }}
            >
                {!loading ? (
                    <ErrorBoundary>
                        <AssetTable />
                    </ErrorBoundary>
                ) : null}
            </Box>
        </Box>
    );
};

export default Assets;