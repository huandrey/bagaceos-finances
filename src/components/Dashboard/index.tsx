import React from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";
import { Container } from './styles';

export function Dashboard() {
  const { transactions } = useTransactions(); 
  return (
    <Container>
      <Summary />
      <TransactionTable />
      
    </Container>
  )
}