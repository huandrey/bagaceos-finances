import { createContext, useState, useContext, ReactNode } from 'react';
// import { api } from '../services/api';
import nextId from 'react-id-generator';

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (transactionId: number) => void; 
}

const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionProvider({children}: TransactionProviderProps ) {
  let [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storagedFinances = localStorage.getItem("@bagaceos/finances");

    if (storagedFinances) return JSON.parse(storagedFinances);

    return [];
  });


  async function createTransaction(transactionInput: TransactionInput) {
    /* const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date()
    });
    */

    const transaction = {
      id: Number(nextId()),
      ...transactionInput,
      createdAt: String(new Date()),
    }

    // const { transaction } = response.data;

    setTransactions([...transactions, transaction])


    // LocalStorage
    localStorage.setItem('@bagaceos/finances', JSON.stringify([...transactions, transaction]));
    return 
  }

  async function removeTransaction(transactionId: number) {
    const newTransactions = transactions.filter(transaction => transaction.id !== transactionId && transaction);

    setTransactions(newTransactions);

    localStorage.setItem('@bagaceos/finances', JSON.stringify([newTransactions]));
    return 
  }
  return (
    <TransactionContext.Provider value={{ transactions, createTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context
}