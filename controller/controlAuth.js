import dotenv from 'dotenv';
import workout from '../modules/Workout.js';
import user from  '../modules/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


dotenv.config({path:'../'});


async function register(req, res){
    try{
        //verifica se todos os campos estao povoados
        if(!req.body.name || !req.body.password || !req.body.email) 
        {
            return res.status(400).json("Envie os dados necessários");
        }        

        //checar se user existe
        const userExists = await user.findOne({email:req.body.email});
        if(userExists) return res.status(400).json("Usuário ja existe");

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        req.body.password = passwordHash;

        const createUser = await user.create(req.body);
        res.json(createUser);
    }
    catch(error){
        res.json({error: error});
    }
}

async function login(req, res){
    try{
        //verificando todos os campos
        if(!req.body.email || !req.body.password) return res.status(400).json("O email e senha são obrigatorios");
        
        //verificando se usuário existe e tem a senha informada
        const curruser = await user.findOne({email:req.body.email});
        if(!curruser) return res.status(422).json('Usuário não existe');
        const validPass = await bcrypt.compare(req.body.password, curruser.password);
        if (!validPass) return res.status(422).json("Senha incorreta");

        //cria o token JWT
        const secret = process.env.SECRET;
        const token = jwt.sign({id:curruser._id}, secret);


        //resposta sucesso login

        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000 // Expira em 1 dia
        });

        res.cookie('email', req.body.email);
        return res.status(200).json({message:`Login de ${curruser.name} efetuado com sucesso`, token});
    }
    catch(error){
        return res.status(500).json(error);
    }
}

async function deluser(req, res){
    try{
        const deleteUser = await user.findOneAndDelete({email:req.params.email});
        res.status(200).json(`user de ${deleteUser.name} deletado com succeso`);
    }
    catch(error){
        res.json({message: "erro ao deletar usuário: ", error:error.message});

    }
}

//Lista todos os usuários
async function getusers(req, res){
    try{
        const users = await user.find();
        res.status(200).json(users);
    }
    catch(error){
        res.json(error);
    }
}

async function logout(req, res){
    try{
        res.clearCookie('token');
        res.clearCookie('email');
        return res.status(401).json("Logout efetuado com sucesso");

    }
    catch(error){
        res.json(error);

    }
  


}

export {
    register,
    login,
    deluser,
    getusers,
    logout
};