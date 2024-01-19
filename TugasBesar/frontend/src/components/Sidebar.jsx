import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoBook, IoBag, } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
    await dispatch(LogOut());
    dispatch(reset());
    navigate("/", { replace: true }); // Use replace to replace the current entry in the navigation history
  };

  return (
    <div>
      <aside className="menu pl-2  has-black-white">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"} className="has-black-white">
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/peminjamans"} className="has-black-white">
              <IoBag /> Peminjaman
            </NavLink>
          </li>
          <li>
            <NavLink to={"/bukus"} className="has-black-white">
              <IoBook /> Buku
            </NavLink>
          </li>
          <li>
            <NavLink to={"/anggota"} className="has-black-white">
              <IoPerson /> Anggota
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"} className="has-text-black has">
                  <IoPerson /> Petugas
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;