import styled from "styled-components";
import { useState, useEffect } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 10px;
    font-family: Geist;
    width: 360px;
    color: white;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions, payload];
        updateTransaction(transactionArray);
    };

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.forEach((payload) => {
            payload.type === "EXPENSE"
                ? (exp = exp + payload.amount)
                : (inc = inc + payload.amount);
        });
        updateExpense(exp);
        updateIncome(inc);
    };

    useEffect(() => {
        calculateBalance();
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    return (
        <Container>
            <OverviewComponent addTransaction={addTransaction} expense={expense} income={income} />
            <TransactionComponent transactions={transactions} />
        </Container>
    );
};

export default HomeComponent;