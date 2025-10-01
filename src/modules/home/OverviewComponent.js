
import styled from "styled-components"
import React, { useState } from "react";
import ExpensePieChart from "./ExpensePieChart";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    font-family: Geist;
    width: 100%;
    background: #fff;
    color: #000;
    letter-spacing: -0.5px;
`;

const BalanceBox = styled.div`
    font-size: 18px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #000;
    letter-spacing: -0.5px;
`;

const AddTransaction = styled.button`
    background-color: #000;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    font-family: Geist;
    border: none;
    letter-spacing: -0.5px;
`;

const AddTransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    width: 350px;
    max-width: 90vw;
    padding: 15px 20px;
    margin: 20px auto 0 auto;
    outline: none;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    border: 1px solid #bbb;
    letter-spacing: -0.5px;
    & input{
        border: 1px solid #bbb;
        outline: none;
        padding: 10px 12px;
        font-family: Geist;
        border-radius: 10px;
        color: #000;
        background-color: #fff;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        letter-spacing: -0.5px;
    }
`;

const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    letter-spacing: -0.5px;
    & input {
        width: unset;
        margin: 10px;
    }
    & label {
        color: #000;
        letter-spacing: -0.5px;
    }
`;

const AddTransactionView = (props) => {
    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("EXPENSE");
    const [error, setError] = useState("");
    const addTransaction = () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!desc || desc.trim().length === 0) {
            setError("Please enter a description");
            return;
        }
        setError("");
        props.addTransaction({ amount: Number(amount), desc, type, id: Date.now() });
        props.toggleAddTxn();
    };

    return (
        <AddTransactionContainer>
            <input 
                placeholder="Amount"
                value={amount}
                type="number"
                onChange={(e)=>setAmount(e.target.value)}
            />
            <input 
                placeholder="Description"
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
            />
            <RadioBox>
                <input 
                    type="radio" 
                    id="expense" 
                    name="type" 
                    value="EXPENSE" 
                    checked={type === "EXPENSE"}
                    onChange={(e)=>setType(e.target.value)}
                />
                <label htmlFor="expense">Expense</label>
                <input 
                    type="radio" 
                    id="income" 
                    name="type" 
                    value="INCOME" 
                    checked={type === "INCOME"}
                    onChange={(e)=>setType(e.target.value)}
                />
                <label htmlFor="income">Income</label>
            </RadioBox>
            {error && <span style={{ color: '#d32f2f', marginBottom: 8, fontSize: 13 }}>{error}</span>}
            <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    );
};

const ExpenseContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin: 20px;
    letter-spacing: -0.5px;
`;

const ExpenseBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
    border: 1px solid #bbb;
    padding: 15px 20px;
    width: 135px;
    font-size: 14px;
    font-family: Geist;
    box-shadow: -3px 3px 10px rgba(0,0,0,0.07);
    letter-spacing: -0.5px;
    & span{
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => props.isIncome ? "#009900":"#d32f2f"};
        letter-spacing: -0.5px;
    }
`;

const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false);
    return (
        <Container>
            <BalanceBox>
                Balance: ${props.income - props.expense}
                <AddTransaction onClick={()=>toggleAddTxn(!isAddTxnVisible)}>
                    {isAddTxnVisible ? "Cancel" : "ADD"} 
                </AddTransaction>
            </BalanceBox>
            <AnimatePresence>
                {isAddTxnVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        key="add-txn-view"
                        style={{ width: '100%' }}
                    >
                        <AddTransactionView 
                            toggleAddTxn={toggleAddTxn} 
                            addTransaction={props.addTransaction} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Chart Section */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24, marginBottom: 8 }}>
                <ExpensePieChart income={props.income} expense={props.expense} />
            </div>
            <ExpenseContainer>
                <ExpenseBox isIncome={false}>
                    Expense<span>${props.expense}</span>
                </ExpenseBox>
                <ExpenseBox isIncome={true}>
                    Income<span>${props.income}</span>
                </ExpenseBox>
            </ExpenseContainer>
        </Container>
    );
};
export default OverviewComponent;
