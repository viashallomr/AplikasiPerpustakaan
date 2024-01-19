import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Bukus from "./BukuModel.js";
import Anggotas from "./AnggotaModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Peminjamans = db.define('peminjamans', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tgl_pinjam: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl_kembali: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    bukuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
    }
    },
    anggotaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
    }
    
    },
    statusPinjam: {
      type: DataTypes.ENUM('sedang dipinjam', 'Telah dikembalikan'),
      defaultValue: 'sedang dipinjam',
      allowNull: false,
      validate: {
        notEmpty: true,
    }
    
    },
    
  }, {
    freezeTableName: true,
  });
  
  Bukus.hasMany(Peminjamans);
  Anggotas.hasMany(Peminjamans);
  Users.hasMany(Peminjamans);
  Peminjamans.belongsTo(Bukus, { foreignKey: 'bukuId' });
  Peminjamans.belongsTo(Anggotas, { foreignKey: 'anggotaId' });
  Peminjamans.belongsTo(Users, { foreignKey: 'userId' });

  
  
  export default Peminjamans;
  
