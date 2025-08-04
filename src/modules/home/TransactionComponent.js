import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  background-color: black;
  color:#ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #9a9a9a;
    border: solid #9a9a9a;
    outline: none;
  }
`;
const Cell = styled.div`
  background-color:#2d2d2d;
  color: white;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #000000;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>${props.payload?.amount}</span>
    </Cell>
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
      {filteredTransaction?.map((payload) => (
        <TransactionCell payload={payload} />
      ))}
    </Container>
  );
};
export default TransactionsComponent;