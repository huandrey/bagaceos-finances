import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';
import { FaTrash } from 'react-icons/fa';


export function TransactionTable() {
  
  const { transactions, removeTransaction } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
            <tr>
              <th>Titulo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
        </thead>
        <tbody>
        {transactions.map(transaction => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount) || 0}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt))
                }
              </td>
              <td>
                <FaTrash onClick={() => removeTransaction(transaction.id)} color="#E52E4D" />
              </td>
            </tr>
            )
          })}
          </tbody>
      </table>
    </Container>
  );
}