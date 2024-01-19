import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import FormAddUser from './FormAddUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      fetchUsers(); // Fetch the updated list after deletion
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
      <h1 className="title">Daftar Users</h1>
      <button onClick={openModal} className="button is-primary mb-2"  style={{backgroundColor :"#FFBA00"}}>
        Tambah Users Baru
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <FormAddUser fetchUsers={fetchUsers} closeModal={closeModal} />
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.nama}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">Edit</Link>
                <button onClick={() => deleteUser(user.uuid)} className="button is-small is-danger"
                 style={{ backgroundColor: "#D84339" }} 
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;