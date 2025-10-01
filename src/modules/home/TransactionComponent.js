import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  letter-spacing: -0.5px;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #bbb;
    outline: none;
    color: #000;
    letter-spacing: -0.5px;
  }
`;
const Cell = styled.div` 
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #bbb;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "#d32f2f" : "#009900")};
  letter-spacing: -0.5px;
`;
const TransactionCell = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      <Cell isExpense={props.payload?.type === "EXPENSE"}>
        <span>{props.payload?.desc}</span>
        <span>${props.payload?.amount}</span>
      </Cell>
    </motion.div>
  );
};
const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      <AnimatePresence>
        {filteredTransaction?.map((payload) => (
          <TransactionCell key={payload.id} payload={payload} />
        ))}
      </AnimatePresence>
    </Container>
  );
};
export default TransactionsComponent;