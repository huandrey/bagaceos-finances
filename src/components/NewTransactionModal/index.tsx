import { FormEvent, useState } from 'react';

import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
Modal.setAppElement('#root');
export function NewTransactionModal({ isOpen, onRequestClose } : NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(e : FormEvent) {
    e.preventDefault();
    
    await createTransaction({ 
      title,
      type,
      category,
      amount
    })
    setTitle('');
    setType('deposit');
    setAmount(0);
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      >
      <button 
        type="button" 
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt=""/>
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>
        
        <input type="text" placeholder="Titulo" value={title} onChange={event => setTitle(event.target.value)}/>
        
        <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))} />
        
        <TransactionTypeContainer>
          <RadioBox
           type="button"
           onClick={() => setType("deposit") }
           isActive={type === "deposit"}
           activeColor="green"
           >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
            onClick={() => setType("withdraw") }
            isActive={type === "withdraw"}
            activeColor="red"
            type="button"
          >
            <img src={outcomeImg} alt="Entrada"/>
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>
        
        <input type="text" placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
        
        <button onClick={handleCreateNewTransaction} type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}