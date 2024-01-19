import express from "express";
import {
    getPeminjamans,
    getPeminjamanById,
    createPeminjaman,
    updatePeminjaman, 
    deletePeminjaman,
   
} from "../controllers/Peminjamans.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/peminjamans',verifyUser, getPeminjamans);
router.get('/peminjamans/:id',verifyUser, getPeminjamanById)
router.post('/peminjamans',verifyUser, createPeminjaman);
router.patch('/peminjamans/:id',verifyUser, updatePeminjaman);

router.delete('/peminjamans/:id',verifyUser, deletePeminjaman);


export default router;