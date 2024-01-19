import Buku from "../models/BukuModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getBukus = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Buku.findAll({
                attributes: ['uuid', 'judul', 'penulis', 'penerbit','kategori', 'tahunTerbit', 'stok'],
                include: [{
                    model: User,
                    attributes: ['nama', 'email']
                }]
            });
        } else{
            response = await Buku.findAll({
                attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'kategori', 'tahunTerbit', 'stok'],
                where:{
                    userId: req.userId
                },
                include: [{
                    model: User,
                    ttributes: ['nama', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getBukuById = async(req, res) =>{
    try {
        const buku = await Buku.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!buku) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Buku.findOne({
                attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'kategori', 'tahunTerbit', 'stok'],
                where: {
                    id: buku.id
                },
                include: [{
                    model: User,
                    attributes: ['nama', 'email']
                }]
            });
        } else{
            response = await Buku.findOne({
                attributes: ['uuid', 'judul', 'penulis', 'penerbit', 'kategori','tahunTerbit', 'stok'],
                where:{
                    [Op.and]:[{id: buku.id}, {userId:req.userId}]
                },
                include: [{
                    model: User,
                    ttributes: ['nama', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createBuku = async(req, res) =>{
    const {judul, penulis, penerbit, kategori, tahunTerbit, stok} = req.body;
    try {
        await Buku.create({
            judul: judul,
            penulis: penulis,
            penerbit: penerbit,
            kategori: kategori,
            tahunTerbit: tahunTerbit,
            stok: stok,
            userId: req.userId
        });
        res.status(201).json({msg: "Buku Sukses Ditambahkan"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateBuku = async(req, res) =>{
    try {
        const buku = await Buku.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!buku) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {judul, penulis, penerbit, kategori, tahunTerbit, stok} = req.body;
        if(req.role === "admin"){
            await Buku.update({judul, penulis,kategori, penerbit, tahunTerbit, stok},{
                where:{
                    id: buku.id
                }
            });
        } else{
            if(req.userId !== buku.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Buku.update({judul, penulis, penerbit, kategori, tahunTerbit, stok},{
                where:{
                    [Op.and]:[{id: buku.id}, {userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Buku berhasil diperbaharui"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteBuku = async(req, res) =>{
    try {
        const buku = await Buku.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!buku) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {judul, penulis, penerbit, kategori, tahunTerbit, stok} = req.body;
        if(req.role === "admin"){
            await Buku.destroy({
                where:{
                    id: buku.id
                }
            });
        } else{
            if(req.userId !== buku.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Buku.destroy({
                where:{
                    [Op.and]:[{id: buku.id}, {userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Buku berhasil dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
