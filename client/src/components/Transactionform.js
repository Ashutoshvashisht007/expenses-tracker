import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography, Box, TextField } from '@mui/material';
// import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Cookies from "js-cookie";
import { styled } from '@mui/material/styles';

const intialForm = {
    amount: '0',
    description: "",
    date: new Date(),
}

const UserBox = styled(Box)(({theme})=>({
    // agr small screen se chota hua toh isko display kro wrna isko display na krd
    marginTop: 3, 
    display:"flex", 
    alignItems: 'center',
    justifyContent: 'center',
                            
    [theme.breakpoints.down("sm")]:{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
    }
    
  }));

export default function TransactionForm({ fetchTransactions, editTransactions, btn, setbtn }) {
    const token = Cookies.get('token');
    // creating a useState so that we can store the values in the form somewhere
    const [form, setForm] = useState(intialForm);

    useEffect(() => {
        if (editTransactions.amount !== undefined) {
            setForm(editTransactions);
        }
    }, [editTransactions]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleDate(newValue) {
        setForm({ ...form, date: newValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        editTransactions.amount === undefined ? create() : update();
    }

    function reload(res) {
        if (res.ok) {
            setForm(intialForm);
            fetchTransactions();
        }
    }
    

    async function create() {
        // creating the transaction as we are providing POST here
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json", // converting plain text to json
                "Authorization": `Bearer ${token}`,
            }
        });
        reload(res);
    }
    async function update() {
        // updating the transaction as we are providing PATCH here
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransactions._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json", // converting plain text to json
                "Authorization": `Bearer ${token}`,
            }
        });
        setbtn(true);
        reload(res);
    }


    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant='h6'>
                    Add New Transaction
                </Typography>
                <UserBox component="form" onSubmit={handleSubmit} >
                    <TextField
                        sx={{marginRight: 5, marginTop: 3}}
                        size="small"
                        id="outlined-basic"
                        label="Amount"
                        name='amount'
                        variant="outlined"
                        value={form.amount}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ marginRight: 5, marginTop: 3}}
                        size="small"
                        id="outlined-basic"
                        label="Description"
                        name='description'
                        variant="outlined"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date of Transaction"
                            inputFormat="MM/DD/YYYY"
                            value={form.date}
                            onChange={handleDate}
                            renderInput={(params) =>
                                <TextField
                                    sx={{ marginRight: 5, marginTop: 3 }}
                                    size="small" {...params}
                                />
                            }
                        />
                    </LocalizationProvider>
                    {
                        btn === false &&
                            <Button sx={{ marginRight: 5, marginTop: 3 }} type="submit" variant="contained">Update</Button>
                    }
                    {
                        btn === true &&
                            <Button sx={{ marginRight: 5, marginTop: 3 }} type="submit" variant="contained">Submit</Button>
                    }
                </UserBox>
            </CardContent>
        </Card>
    );
}