import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import FormAddAnggota from './FormAddAnggota';

const AnggotaList = () => {
  const [anggota, setAnggota] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnggota();
  }, []);

  const fetchAnggota = async () => {
    try {
      const response = await axios.get('http://localhost:5000/anggotas');
      setAnggota(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const deleteAnggota = async (AnggotaId) => {
    try {
      await axios.delete(`http://localhost:5000/anggotas/${AnggotaId}`);
      fetchAnggota(); // Fetch the updated list after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="title">Daftar Anggota</h1>
      <button onClick={openModal} className="button is-primary mb-2" style={{backgroundColor :"#FFBA00"}}>
        Tambah Anggota Baru
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <FormAddAnggota fetchAnggota={fetchAnggota} closeModal={closeModal} />
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
            <th>Id</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {anggota.map((anggota, index) => (
            <tr key={anggota.id}>
              <td>{index + 1}</td>
              <td>{anggota.nama}</td>
              <td>{anggota.alamat}</td>
              <td>{anggota.email}</td>
              <td>
                <Link to={`/anggota/edit/${anggota.id}`} className="button is-small is-info">Edit</Link>
                <button
             onClick={() => deleteAnggota(anggota.id)}
            className="button is-small is-danger"
            style={{ backgroundColor: "#D84339" }} 
            >
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

export default AnggotaList;