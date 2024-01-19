import Anggota from "../models/AnggotaModel.js";

export const getAnggotas = async(req, res) =>{
    try {
        const response = await Anggota.findAll({
            attributes: ['id', 'nama', 'alamat', 'email']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAnggotaById = async(req, res) =>{
    try {
        const response = await Anggota.findOne({
            attributes: ['id', 'nama', 'alamat', 'email'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAnggota = async(req, res) =>{
    const {nama, alamat, email} = req.body;
    try {
        await Anggota.create({
            nama: nama,
            alamat: alamat,
            email : email
        });
        res.status(201).json({msg: "Anggota Berhasil Ditambahkan"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    } 
}

export const updateAnggota = async(req, res) =>{
    const anggota = await Anggota.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!anggota) return res.status(404).json({msg: "Anggota tidak ditemukan"});
    const {nama, alamat,  email} = req.body;
    try {
        await Anggota.update({
            nama: nama,
            alamat: alamat,
            email: email,
        },{
            where:{
                id: anggota.id
            }
        });
        res.status(200).json({msg: "Data anggota berhasil  diUpdate"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteAnggota = async(req, res) =>{
    const anggota = await Anggota.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!anggota) return res.status(404).json({msg: "Anggota tidak ditemukan"});
    try {
        await Anggota.destroy({
            where:{
                id: anggota.id
            }
        });
        res.status(200).json({msg: "Anggota Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}