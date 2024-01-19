import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormAddPeminjaman from './FormAddPeminjaman';

const PeminjamanList = () => {
  const [peminjamans, setPeminjamans] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPeminjamans();
  }, []);

  const getPeminjamans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/peminjamans');
      setPeminjamans(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deletePeminjaman = async (peminjamanId) => {
    try {
      await axios.delete(`http://localhost:5000/peminjamans/${peminjamanId}`);
      getPeminjamans(); // Fetch the updated list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    getPeminjamans(); // Refresh the list after closing modal
  };

  return (
    <div>
      <h1 className="title">Daftar Peminjaman</h1>
      <button onClick={openModal} className="button is-primary mb-2"  style={{backgroundColor :"#FFBA00"}}>
        Tambah Peminjaman Baru
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <FormAddPeminjaman closeModal={closeModal} />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </div>
      )}

      {/* Table */}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Id Buku</th>
            <th>Id Anggota</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {peminjamans.map((peminjaman, index) => (
            <tr key={peminjaman.uuid}>
              <td>{index + 1}</td>
              <td>{peminjaman.tgl_pinjam}</td>
              <td>{peminjaman.tgl_kembali}</td>
              <td>{peminjaman.bukuId}</td>
              <td>{peminjaman.anggotaId}</td>
              <td>{peminjaman.statusPinjam}</td>
              <td>
                <Link to={`/peminjamans/edit/${peminjaman.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deletePeminjaman(peminjaman.uuid)} className="button is-small is-danger"
                 style={{ backgroundColor: "#D84339" }} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeminjamanList;
