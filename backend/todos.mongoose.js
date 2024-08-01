
import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/todo');


const todo = new Schema({
    name:String,
    title: String,
    isdone:Boolean
});
const finishedtodo = new Schema({
    name:String,
    title: String,
    isdone:Boolean
});
const deletetodo = new Schema({
    name:String,
    title: String,
    isdone:Boolean
});

const Todo = mongoose.model("Todo", todo)


export const Finishedtodo  = mongoose.model("finishedtodo", finishedtodo)

export const Deletetodo  = mongoose.model("deletedtodo", deletetodo)


export default Todo

