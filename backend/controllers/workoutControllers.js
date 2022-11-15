const WorkoutModel = require('../models/WorkoutModel')
const mongoose=require('mongoose')


//GET ALL  WORKOUTS
const getWorkouts = async(req,res)=>{
    const workouts= await WorkoutModel.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}
//GET A SINGLE WORKOUT
const getWorkout = async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error:'NO Such ID'})
    }
    const workout = await WorkoutModel.findById(id)
    if(!workout){
        return res.status(400).json({error:'NO Such Data Available '})
    }
    res.status(200).json(workout)
}
//CREATE A NEW WORKOUT
const createWorkout =async (req,res)=>{

    const {title,load,reps}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }       
    if(emptyFields.length>0) {
        // return res.status(400).json({error:'Please Fill in all Fields',emptyFields})
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    //ADD DOC TO dB
    try{
            const workout =  await WorkoutModel.create({title,load,reps})
            res.status(200).json(workout)
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE A WORKOUT
const deleteWorkout = async (req,res)=>{

    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error:'NO Such Data'})
    }
    const workout = await WorkoutModel.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:'NO Such Data'})
    }
    res.status(200).json({mssg:"Deleted Succesfully"})

}
//UPDATE A WORKOUT
const updateWorkout = async(req,res)=>{

    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({error:'NO Such Data'})
    }

    const workout = await WorkoutModel.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error:'NO Such Data'})
    }
    res.status(200).json(workout)

}


module.exports={
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}