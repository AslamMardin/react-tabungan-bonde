import React, {useState, useEffect, useRef} from 'react'

const AddTransaction = ({onTambahTransaction}) => {

	const getTanggal = () => {
		let dateObj = new Date()

		const tanggal = dateObj.getDate().toString().padStart(2,"0")
		const bulan = (dateObj.getMonth() + 1).toString().padStart(2,"0")
		return `${tanggal}/${bulan}/${dateObj.getFullYear()}`
	}

	const [formInput, setFormInput] = useState({
		tanggal: getTanggal(),
		keterangan:"",
		nominal:""
	})

	const [errors, setErrors] = useState({
		keterangan:"",
		tanggal:"",
		nominal:""
	})

	const formValid = useRef(true)


	const handleInputChange = (e) => {
		setFormInput({...formInput, [e.target.name]: e.target.value})
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		let pesanErrors = {}


		//validasi tanggal 
		if (formInput.tanggal.trim() == "") {
			pesanErrors.tanggal = "Tanggal Tidak Boleh Kosong"
		}else if(!/^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/.test(formInput.tanggal)){
			pesanErrors.tanggal = "Format Tanggal Tidak Sesuai"
		}else {
			pesanErrors.tanggal = ""
		}


		//validasi keterangan
		if (formInput.keterangan.trim() == "") {
			pesanErrors.keterangan = "Keterangan Tidak Boleh Kosong"
		}else {
			pesanErrors.keterangan = ""
		}

		// validasi nominal
		if (formInput.nominal.trim() == "") {
			pesanErrors.nominal = "Nominal Tidak Boleh Kosong"
		}else if(!/^[+|-]?\d+$/.test(formInput.nominal)){
			pesanErrors.nominal = "Nominal Harus Angka"
		}else {
			pesanErrors.nominal = ""
		}

		// update erorrs
		setErrors(pesanErrors)


		// cek apakah seluruh form valid
		formValid.current = true
		for(let prop in pesanErrors){
			if (pesanErrors[prop].length > 0) {
				formValid.current = false
			}
		}


		// jika tidak ada error
		if (formValid.current) {
			let tanggalInput = new Date
			tanggalInput.setDate(parseInt(formInput.tanggal.substr(0,2)))
			tanggalInput.setMonth(parseInt(formInput.tanggal.substr(3,2) -1 ))
			tanggalInput.setFullYear(parseInt(formInput.tanggal.substr(6,4)))

			onTambahTransaction({
				id: Math.floor(Math.random() * 1000000000000).toString(),
				tanggal:tanggalInput.getTime(),
				keterangan:formInput.keterangan.toLowerCase(),
				nominal: parseInt(formInput.nominal)
			})
			// kosongkan input

			setFormInput({
				tanggal:getTanggal(),
				keterangan:"",
				nominal:""
			})
		}





	}

	// useEffect(() => {
	// }, [formInput])

	return (
		<section id="add-transaction" className="px-2">
			<div className="container py-4">
				<h2 className="fw-light mb-3 text-center">Tambah Transaksi</h2>
				<hr className="w-75 mb-4 mx-auto" />
			</div>

			

			<form onSubmit={handleFormSubmit}>
				<div className="row">
					<div className="col-12 col-md-3 col-lg-2 mb-3">
						<label htmlFor="tanggal" className="form-label">Tanggal</label>
						<input type="text" id="tanggal" name="tanggal"
						placeholder="dd/mm/yyy"
						className={`form-control ${errors.tanggal && "is-invalid"}`}
						onChange={handleInputChange} value={formInput.tanggal} autocomplete="off"
						/>
						{errors.tanggal && <small className="text-danger mt-1 fw-bold text-small">{errors.tanggal}</small>}
					</div>
					<div className="col-12 col-md-3 col-lg-2 mb-3">
						<label htmlFor="keterangan" className="form-label">Keterangan</label>
						<input type="text" id="keterangan" name="keterangan"
						placeholder="Bayar Cicilan"
						className={`form-control ${errors.keterangan && "is-invalid"}`}
						onChange={handleInputChange} value={formInput.keterangan} autocomplete="off"
						/>
						{errors.tanggal && <small className="text-danger mt-1 fw-bold text-small">{errors.keterangan}</small>}
					</div>

					<div className="col-12 col-md-3 col-lg-3 mb-3">
						<label htmlFor="nominal" className="form-label">
							Nominal* (+/-)
						</label>
						<input type="text" id="nominal" name="nominal" 
						placeholder="-150000"
						className={`form-control ${errors.nominal && "is-invalid"}`}
						onChange={handleInputChange} value={formInput.nominal} autocomplete="off"
						/>
						{errors.tanggal && <small className="text-danger mt-1 fw-bold text-small">{errors.nominal}</small>}
					</div>
					<div className="col-12 col-lg-2 mb-3 d-flex align-items-end">
						<button type="submit" className="btn btn-primary flex-fill">
							Tambah
						</button>
					</div>
				</div>
				<p><small>* Jika diisi angka negatif,
				akan tercatat di pengeluaran</small></p>
			</form>
		</section >
	)
}

export default AddTransaction