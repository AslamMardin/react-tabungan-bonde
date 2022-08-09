import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Transaction from './components/Transaction'
import SaldoBox from './components/SaldoBox'
import AddTransaction from './components/AddTransaction'

const initTransactions = [

]

function App() {

  const [transactions, setTransaction] = useState(initTransactions)


  // menambah transaksi
  const handleTambahTransaction = (data) => {
    let newTransaction = [
      ...transactions, data
    ]

    newTransaction.sort((a,b) => a.tanggal - b.tanggal)

    setTransaction(newTransaction)
  }

  // menghapus transaksi
  const handleHapusTransaction = (e) => {

    let index = transactions.findIndex(transaction => {
      return transaction.id == e.target.id
    })
    let newTransaction = transactions
    newTransaction.splice(index, 1)
    setTransaction([...newTransaction])
  }

  return (
    <>
    <Header />
    <SaldoBox transactions={transactions} />
    <Transaction transactions={transactions} onHapusTransaction={handleHapusTransaction}  />
    <AddTransaction onTambahTransaction={handleTambahTransaction} />
    <Footer />
    </>
    );
}

export default App;
