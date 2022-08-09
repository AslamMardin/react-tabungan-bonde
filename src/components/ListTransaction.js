import React from 'react'

const ListTransaction = ({id, nominal, keterangan, tanggal, onHapus}) => {

	const getTanggal = (tanggal) => {

		let tglObj = new Date(tanggal)

		const arrBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
		"Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
		let bulan = arrBulan[tglObj.getMonth()]
		return `${tglObj.getDate()} ${bulan} ${tglObj.getFullYear()}`
	}

	let kategoriTransaction = (nominal > 0) ? "list-pemasukan" : "list-pengeluaran"
	return (
		<div className={`list-transaction p-1 mb-2 ${kategoriTransaction}`}>
		<div className="ms-2 d-flex flex-column">
		<p className="m-0 fs-5">{keterangan}</p>
		<small>{getTanggal(tanggal)}</small>
		</div>
		<p className="fs-5 mb-1 me-3 text">
		Rp. {nominal.toLocaleString('id-ID')}
		</p>
		<span className="delete-icon" id={id} data-keterangan={keterangan} onClick={onHapus}>x</span>
		</div>
		)
}

export default ListTransaction