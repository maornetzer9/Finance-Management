import React, { memo, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Chip, Alert } from "@mui/material";
import { MoreVert as MoreVertIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { FORM_FIELDS, TABLE_HEADERS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssetAction, editAssetAction } from "../../action/assets";
import { useLocalError } from "../../hooks/error";
import { motion } from "framer-motion";
import { tableVariants } from "../../utils/motion";
import { useMenuAnchor } from "../../hooks/modal";
import ReusableModal from "../ReusableModal";
import _ from 'lodash'

const AssetTable = () => {
    const dispatch = useDispatch();
    const { assets } = useSelector((state) => state.assetsReducer);

    const { localError, setLocalError } = useLocalError();

    const { menuAnchor, handleMenuOpen, handleMenuClose, isDialogOpen, openDialog, closeDialog, selectedData } = useMenuAnchor();

    const editAsset = useCallback(
        async (formData) => {
            const updatedAsset = _.merge(_.cloneDeep(selectedData), formData );

            if (_.isEqual(selectedData, updatedAsset)) return setLocalError("לא היו שינוים במסמך שנערך");

            const { code, message } = await dispatch(editAssetAction(updatedAsset)); // Use your update action
            if (code !== 200) setLocalError(message);
            setSelectedData(null);
        },
        [dispatch, selectedData, setLocalError]
    );

    const deleteAsset = useCallback(
        async (id) => {
            const { code, message } = await dispatch(deleteAssetAction(id));
            if (code !== 200) setLocalError(message);
        },
        [dispatch, setLocalError]
    );


    return (
        <motion.div initial="hidden" animate="visible" variants={tableVariants}>
            <TableContainer sx={{ height: "200px" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                            {TABLE_HEADERS.map((header, index) => (
                                <TableCell
                                    key={index}
                                    align={index === 5 ? "center" : "right"}
                                    sx={{ fontWeight: 600, color: "#475569" }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assets.map((asset) => (
                            <TableRow
                                key={_.get(asset, '_id')}
                                sx={{
                                    "&:hover": {
                                        bgcolor: "#ebf4ee",
                                        transition: "background-color 0.2s",
                                    },
                                }}
                            >
                                <TableCell align="right">{asset.name}</TableCell>
                                <TableCell align="right">
                                    ₪{asset.purchasePrice.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">
                                    ₪{asset.currentValue.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={`${_.get(asset, "growth", 0)}%`}
                                        size="small"
                                        icon={
                                            asset.growth >= 0 ? (
                                                <TrendingUpIcon sx={{ fontSize: 16 }} />
                                            ) : (
                                                <TrendingDownIcon sx={{ fontSize: 16 }} />
                                            )
                                        }
                                        sx={{
                                            bgcolor: asset.growth >= 0 ? "#10B98115" : "#EF444415",
                                            color: asset.growth >= 0 ? "#10B981" : "#EF4444",
                                            fontWeight: 500,
                                            "& .MuiChip-icon": { color: "inherit" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(_.get(asset, "createdAt", Date.now())).toLocaleDateString("he-IL")}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={(e) => handleMenuOpen(e, asset)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={menuAnchor.element}
                                        open={Boolean(menuAnchor.element && menuAnchor.data?._id === asset._id)}

                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            elevation: 2,
                                            sx: { minWidth: 120 },
                                        }}
                                    >
                                        <MenuItem onClick={() => openDialog(asset)}>
                                            <EditIcon sx={{ ml: 1, fontSize: 20, color: "#6B7280" }} />
                                            ערוך
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                handleMenuClose();
                                                deleteAsset(asset._id);
                                            }}
                                            sx={{ color: "#EF4444" }}
                                        >
                                            <DeleteIcon sx={{ ml: 1, fontSize: 20 }} />
                                            מחק
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {localError && (
                <Alert variant="standard" severity="error" sx={{ gap: 1 }}>
                    {localError}
                </Alert>
            )}
            <ReusableModal
                title={"עריכת פרטי הנכס"}
                isModalOpen={isDialogOpen}
                inputFields={FORM_FIELDS}
                setIsModalOpen={closeDialog} 
                onSubmit={(data) => editAsset(data)} 
                inputsData={selectedData || {}} 
                mode="edit"
            />
        </motion.div>
    );
};

export default memo(AssetTable);