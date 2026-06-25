import dotenv from 'dotenv';
import workout from '../modules/Workout.js';
import user from  '../modules/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config({path:'../'});



async function createWorkout(req, res){
    if(!req.body.name || !req.body.exercises || !req.body.userEmail)
    {
        return res.status(400).json("Envie os dados necessários: name, exercises e userEmail");
    }
    const nameExist = await workout.findOne({name:req.body.name});
    if(nameExist) return res.status(400).json("Nome de workout já cadastrado");

    const newWorkout = await workout.create(req.body);
    res.status(200).json({message:"Workout Criado com sucesso", newWorkout});
}

async function updateWorkout(req, res){
    try{
        if(req.body.scheduleWorkout) return res.status(400).json("Atualize a data usando o scheduleWorkout");
        const nameExist = await workout.findOne({name:req.params.name});
        if(!nameExist) return res.status(404).json("Workout não encontrado");
        const updateWorkout = await workout.updateOne({name:req.params.name}, req.body);
        res.status(200).json({message:"Workout atualizado com sucesso", updateWorkout});
    }
    catch(error){
        res.json(error);
    }
}

async function deleteWorkout(req, res){
    try{
        const deleteWorkout = await workout.findOneAndDelete({name:req.params.name});
        if(!deleteWorkout) return res.status(404).json("Workout não encontrado");
        res.json({message:"Workout deletado com sucesso", deleteWorkout});
    }
    catch(error){
        res.json(error);
    }
}

async function scheduleWorkout(req, res){
    try{
        const nameExist = await workout.findOne({name:req.params.name});
        if(!nameExist) return res.status(404).json("Workout não encontrado");

        if(!req.body.schedule)  return res.status(400).json("A data que pretende fazer o workout é obrigatorio");

        if(Object.keys(req.body).length > 1) return res.status(400).json("Para atualizar outras variaveis use updateworkout");

        const scheduleworkout = await workout.updateOne({name:req.params.name}, {schedule: req.body.schedule});
        res.status(200).json({message:"Workout atualizado com sucesso", scheduleworkout});
    }
    catch(error){
        res.json(error);
    }
}
async function listWorkout(req,res){
    try{
        const userEmail = req.params.userEmail || req.query.userEmail || req.body.userEmail;
        if(!userEmail) return res.status(400).json("Informe o userEmail na rota, query ou body");

        const workouts = await workout.find({userEmail:userEmail, status: "Pending"}).populate('exercises.exerciseId');
        if(!workouts || workouts.length === 0) return res.status(404).json({message: "Nenhum workout encontrado para este usuário"});

        res.status(200).json(workouts);
    }
    catch(error){
        res.json(error);
    }
}

async function generateReport(req, res){
    try{
        const userEmail = req.params.userEmail || req.query.userEmail || req.body.userEmail;
        if(!userEmail) return res.status(400).json("Informe o userEmail na rota, query ou body");

        const workouts = await workout.find({userEmail:userEmail, status: "completed"}).populate('exercises.exerciseId');
        if(!workouts || workouts.length === 0) return res.status(404).json({message: "Nenhum workout concluido por este usuário"});

        res.status(200).json(workouts);
    }
    catch(error){
        res.json(error);
    }
}

export {
    createWorkout,
    listWorkout,
    scheduleWorkout,
    updateWorkout,
    deleteWorkout,
    generateReport
};