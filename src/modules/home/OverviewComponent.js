import styled from "styled-components"

import React, { useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    font-family: Geist;
    width: 100%;
`;

const BalanceBox = styled.div`
    font-size: 18px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
`;

const AddTransaction = styled.button`
    background-color: #00b894;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    font-family: Geist;
    border: none;

`;

const AddTransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2d2d2d;
    border-radius: 10px;
    width: 100%;
    padding: 15px 20px;
    margin: 20px;
    outline: none;
    & input{
        border: none;
        outline: none;
        padding: 10px 12px;
        font-family: Geist;
        border-radius: 10px;
        color: white;
        background-color:#191919;
        margin-bottom: 5px;
  
    }
`;

const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    & input {
        width: unset;
        margin: 10px;
    }
`;

const AddTransactionView = (props) => {
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");
    const addTransaction = () => {
        props.addTransaction({ amount:Number(amount), desc, type, id: Date.now() });
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
            <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    );
};

const ExpenseContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin: 20px;
`;

const ExpenseBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #3a3a3a;
    color: #b4b4b4;
    border: 1px solid #3a3a3a;
    padding: 15px 20px;
    width: 135px;
    font-size: 14px;
    font-family: Geist;
    box-shadow: -3px 3px 10px rgba(143, 140, 136);
    & span{
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => props.isIncome ? "#36FF00":"red"}
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
                {isAddTxnVisible && (
                    <AddTransactionView 
                    toggleAddTxn={toggleAddTxn} 
                    addTransaction={props.addTransaction} 
                    />
                )}
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
