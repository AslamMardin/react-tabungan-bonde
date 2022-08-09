import React, {useState, useEffect} from 'react'

const SaldoBox = ({transactions}) => {

	const [saldoPemasukan, setSaldoPemasukan] = useState(0)
	const [saldoPengeluaran, setSaldoPengeluaran] = useState(0)

	useEffect(() => {
		let totalPengeluaran = 0
		let totalPemasukan = 0

		transactions.forEach(transaction => {
			if(transaction.nominal > 0){
				totalPemasukan += transaction.nominal
			}else {
				totalPengeluaran += transaction.nominal
			}

		})
		setSaldoPemasukan(totalPemasukan)
		setSaldoPengeluaran(totalPengeluaran)

	}, [transactions])

	return (
		<section id="saldo-box">
		<div className="container mb-4">
		<div className="total-saldo">
		<p className="pt-4 ps-5 mb-0">Total Keseluruhan</p>
		<h2 className="display-5 px-5 pb-3">
		Rp.	{(saldoPemasukan + saldoPengeluaran).toLocaleString('id-ID')}
		</h2>
		<div className="d-flex justify-content-center">
		<p className="mini-saldo mini-saldo-pemasukan py-2">
		Rp. {saldoPemasukan.toLocaleString('id-ID')}
		</p>
		<p className="mini-saldo mini-saldo-pengeluaran py-2">
		Rp. {saldoPengeluaran.toLocaleString('id-ID')}
		</p>
		</div>
		</div>
		</div>
		</section>
		)
}

export default SaldoBox