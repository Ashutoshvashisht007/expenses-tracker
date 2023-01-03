import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export default function TransactionList({ transactions, fetchTransactions, setEditTransanctions, setbtn }) {

    const token = Cookies.get('token');

    async function remove(_id) {
        if (!window.confirm('Are you sure')) {
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${_id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
        if (res.ok) {
            fetchTransactions();
            window.alert('Deleted Successfully');
        }
    }

    function formatDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
    }

    return (
        <>
            <Typography variant='h6' sx={{ marginTop: 10 }}>
                Lists of Transanctions
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 375 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.amount}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            {formatDate(row.date)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => {
                                                    setbtn(false);
                                                    setEditTransanctions(row);
                                                }
                                                }
                                            >
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => {
                                                    remove(row._id);
                                                }
                                                }
                                            >
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}