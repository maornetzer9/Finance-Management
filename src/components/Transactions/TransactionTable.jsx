import React, { useCallback, useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, IconButton, MenuItem, Alert, Menu, FormControl, InputLabel, Select } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import { deleteTransactionAction, editTransactionAction } from "../../action/transactions";
import { FORM_FIELDS_TRANSACTIONS, MONTHS, TRANSACTION_INFO_MESSAGE } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useGetTransactionByMonth } from "../../hooks/transactions";
import { headContentAnimation } from "../../utils/motion";
import { useLocalError } from "../../hooks/error";
import { useMenuAnchor } from "../../hooks/modal";
import { motion } from "framer-motion";
import TransactionAction from "./NewTransaction";
import TransactionFile from "./TransactionFile";
import ReusableModal from "../ReusableModal";
import InfoButton from "../UI/InfoButton";
import _ from "lodash";

export default function TransactionTable() {
    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();
    const { transactions, total } = useSelector((state) => state.transactionsReducer);

    const { menuAnchor, handleMenuOpen, handleMenuClose, isDialogOpen, openDialog, closeDialog, selectedData, setSelectedData } = useMenuAnchor();
    const { getTransactionByMonth, selectedMonthHandler, error } = useGetTransactionByMonth();

    const [ selectedMonth, setSelectedMonth ] = useState(MONTHS[0]);

    const editTransaction = useCallback(
        async (formData) => {
            const updatedTransaction = _.merge(
                _.cloneDeep(selectedData),
                formData
            );

            if (_.isEqual(selectedData, updatedTransaction))
                return setLocalError("לא היו שינוים במסמך שנערך");

            const { code, message } = await dispatch(
                editTransactionAction(updatedTransaction)
            );
            if (code !== 200) setLocalError(message);
            setSelectedData(null);
        },
        [dispatch, selectedData, setLocalError]
    );

    const deleteTransaction = async (id) => {
        try {
            await dispatch(deleteTransactionAction(id, dispatch));
            handleMenuClose();
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => { getTransactionByMonth(selectedMonth, dispatch); }, []);
    useEffect(() => { if (error) return setLocalError(error); }, [error]);

    return (
        <motion.div {...headContentAnimation}>
            <Box
                mt={2}
                className="card"
                sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <InfoButton message={TRANSACTION_INFO_MESSAGE.message} />


                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 5 }}
                >
                  <TransactionAction/>
                  
                   <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ flex: 1 }}
                    >
                            <TransactionFile/>
                    </Box>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="month-select-label">בחר חודש</InputLabel>
                        <Select
                            labelId="month-select-label"
                            value={selectedMonth}
                            onChange={(e) => {
                                selectedMonthHandler(e.target.value, setSelectedMonth);
                                getTransactionByMonth(e.target.value, dispatch);
                            }}
                        >
                            {MONTHS.map((month, index) => (
                                <MenuItem key={index} value={month}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer
                 sx={{
                    minHeight: "100px", 
                    maxHeight: "250px", // Set maximum height for the table container
                    overflowY: "auto", // Enable vertical scrolling within the container
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
                    key={selectedMonth}
                    className="table-container-animation"
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {FORM_FIELDS_TRANSACTIONS.map((field, index) => {
                                    return (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                fontWeight: 600,
                                                color: "#475569",
                                            }}
                                            align="right"
                                        >
                                            {field.label}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions &&
                               transactions.length > 0 &&
                                transactions.map((transaction, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "#e5e9eb",
                                                transition:
                                                    "background-color 0.2s",
                                            },
                                        }}
                                    >
                                        <TableCell align="right">
                                            {transaction?.businessName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {transaction?.amount?.toLocaleString()}₪
                                        </TableCell>
                                        <TableCell align="right">
                                            {transaction?.transactionType}
                                        </TableCell>
                                        <TableCell align="right">
                                            {transaction?.transactionDate}
                                        </TableCell>
                                        {/* {transaction.chargeDate !== null &&  */}
                                            {/* <TableCell
                                                className="numbers"
                                                align="right"
                                            >
                                                {transaction?.chargeDate}
                                            </TableCell> */}
                                        {/* } */}
                                        <TableCell align="right">
                                            {transaction?.notes}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                sx={{ display: "flex" }}
                                                onClick={(e) => handleMenuOpen(e, transaction)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={menuAnchor.element}
                                                open={Boolean(menuAnchor.element && menuAnchor.data === transaction)}
                                                onClose={handleMenuClose}
                                                PaperProps={{
                                                    elevation: 2,
                                                    sx: { minWidth: 120 },
                                                }}
                                            >
                                                <MenuItem onClick={() => openDialog(transaction)}>
                                                    <EditIcon
                                                        sx={{
                                                            ml: 1,
                                                            fontSize: 20,
                                                            color: "#6B7280",
                                                        }}
                                                    />
                                                    ערוך
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        deleteTransaction(transaction._id)
                                                    }
                                                    sx={{ color: "#EF4444" }}
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            ml: 1,
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                    מחק
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        {transactions?.length > 0 && 
                            <TableFooter>
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        align="right"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#2D3748",
                                        }}
                                    >
                                        סה"כ
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className="numbers"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#2D3748",
                                        }}
                                    >
                                        {  total?.toLocaleString() || 0}
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                                {localError && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Alert
                                                variant="standard"
                                                severity="error"
                                                color="error"
                                                sx={{ gap: 1 }}
                                            >
                                                {localError}
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableFooter>
                        }
                    </Table>
                </TableContainer>
            </Box>

            <ReusableModal
                title={"עריכת עסקה"}
                isModalOpen={isDialogOpen}
                inputFields={FORM_FIELDS_TRANSACTIONS}
                setIsModalOpen={closeDialog}
                onSubmit={(data) => editTransaction(data)}
                inputsData={selectedData || {}}
                mode="edit"
            />
        </motion.div>
    );
}