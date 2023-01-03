import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import TransactionForm from '../components/Transactionform';
import TransactionList from '../components/TransactionList';
import Cookies from 'js-cookie';

const Home = () => {
    const [transactions, setTransanctions] = useState([]);
    const [editTransactions, setEditTransanctions] = useState({});
    const [btn, setbtn] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {
        const token = Cookies.get('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }); // fetching the transaction
        const { data } = await res.json();
        setTransanctions(data);
      }

    return (
        <>
            <Container>
                <TransactionForm
                    fetchTransactions={fetchTransactions}
                    editTransactions={editTransactions}
                    btn={btn}
                    setbtn={setbtn}
                />
                <br />
                <TransactionList
                    transactions={transactions}
                    fetchTransactions={fetchTransactions}
                    setEditTransanctions={setEditTransanctions}
                    setbtn={setbtn}
                />
            </Container>
        </>
    )
}

export default Home