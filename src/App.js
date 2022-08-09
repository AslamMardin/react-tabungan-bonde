import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import Header from './components/Header'
import Footer from './components/Footer'
import Transaction from './components/Transaction'
import SaldoBox from './components/SaldoBox'
import AddTransaction from './components/AddTransaction'



function App() {

  const [transactions, setTransaction] = useState([])


  let url = "https://tabungan-bonde-default-rtdb.asia-southeast1.firebasedatabase.app/"
  url += "transaction.json"


  useEffect(() => {
    const myFetch = async () => {
      try{

        let response = await fetch(url, {
          method:"GET"
        })
        if (!response.ok) {
          throw new Error("Terjadi kesalahan baca")
        }
        let responseData = await response.json()


        const initTransactions = []
        for(let key in responseData){
          initTransactions.push({
            id:key,
            tanggal:responseData[key].tanggal,
            keterangan:responseData[key].keterangan,
            nominal:responseData[key].nominal,
          })
        }


        // atur ulang posisi
        initTransactions.sort((a,b) => a.tanggal - b.tanggal)
        setTransaction(initTransactions)
      }catch(e){
        console.log("Error : "+ e)
      }
    }

    myFetch()
  }, [transactions])

  // menambah transaksi
  const handleTambahTransaction = async (data) => {

    try {
      const response = await fetch(url, {
        method:"POST",
        body:JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Kesalahan Penambahan")
      }else {
       swal({
        title: "Berhasil!",
        text: data.keterangan + " Data Berhasil !",
        icon: "success",
        button: "OK!",
      });

     }

   }catch(e){
    console.log("Error : " + e)
  }


}

  // menghapus transaksi
  const handleHapusTransaction = (e) => {

   const hapus = async () => {
     let url = "https://tabungan-bonde-default-rtdb.asia-southeast1.firebasedatabase.app"
     url += "/transaction/"
     url += `${e.target.id}.json`
     try{
      const response = await fetch(url, {
        method:"DELETE"
      })
      if (!response.ok) {
        throw new Error("Kesalahan Hapus")
      }
    }catch(e){
      console.log("Error : "+ e)
    }
  }

  swal({
    title: "Anda Yakin?",
    text: `Data Transaksi ${e.target.getAttribute("data-keterangan")} akan Dihapus !`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      hapus()
      swal(`Berhasil! ${e.target.getAttribute("data-keterangan")} dihapus `, {
        icon: "success",
      });
    }
  });

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
