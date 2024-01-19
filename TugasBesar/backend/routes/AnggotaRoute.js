import express from "express";
import {
    getAnggotas,
    getAnggotaById,
    createAnggota,
    updateAnggota,
    deleteAnggota
} from "../controllers/Anggotas.js";

const router = express.Router();

router.get('/anggotas', getAnggotas);
router.get('/anggotas/:id', getAnggotaById)
router.post('/anggotas', createAnggota);
router.patch('/anggotas/:id', updateAnggota);
router.delete('/anggotas/:id', deleteAnggota);

export default router;