import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import FormAddBuku from './FormAddBuku';

const BukuList = () => {
  const [bukus, setBukus] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBukus();
  }, []);

  const getBukus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bukus');
      setBukus(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteBuku = async (bukuId) => {
    try {
      await axios.delete(`http://localhost:5000/bukus/${bukuId}`);
      getBukus(); // Fetch the updated list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
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
      <h1 className="title">Daftar Buku</h1>
      <button onClick={openModal} className="button is-primary mb-2"  style={{backgroundColor :"#FFBA00"}}>
        Tambah Buku Baru
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <FormAddBuku getBukus={getBukus} closeModal={closeModal} />
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
            <th>Judul</th>
            <th>Penulis</th>
            <th>Penerbit</th>
            <th>Kategori</th>
            <th>Tahun Terbit</th>
            <th>Stok</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bukus.map((buku, index) => (
            <tr key={buku.uuid}>
              <td>{index + 1}</td>
              <td>{buku.judul}</td>
              <td>{buku.penulis}</td>
              <td>{buku.penerbit}</td>
              <td>{buku.kategori}</td>
              <td>{buku.tahunTerbit}</td>
              <td>{buku.stok}</td>
              <td>
                <Link
                  to={`/bukus/edit/${buku.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBuku(buku.uuid)}
                  className="button is-small is-danger" style={{ backgroundColor: "#D84339" }} 
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

export default BukuList;
