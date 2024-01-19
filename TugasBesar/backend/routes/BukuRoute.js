import express from "express";
import {
    getBukus,
    getBukuById,
    createBuku,
    updateBuku,
    deleteBuku
} from "../controllers/Bukus.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/bukus', verifyUser, getBukus);
router.get('/bukus/:id', verifyUser, getBukuById)
router.post('/bukus', verifyUser, createBuku);
router.patch('/bukus/:id', verifyUser, updateBuku);
router.delete('/bukus/:id', verifyUser, deleteBuku);

export default router;