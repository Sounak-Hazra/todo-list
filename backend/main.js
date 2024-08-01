import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Todo from './todos.mongoose.js'
import {Finishedtodo} from './todos.mongoose.js'
import {Deletetodo} from './todos.mongoose.js'
import bodyParser from "body-parser"



const app=express()
const port = 3000


app.use(bodyParser.json());



app.use(
    cors({
        origin:"http://localhost:5173",
    })
)

app.post('/posttodo', async (req, res, next) => {
    const newtodo = await Todo.create({
        name:req.body.name,
        title: req.body.title,
        isdone:req.body.isdone
    })
    res.send(newtodo)
})
app.delete("/addfinishedtodod", async (req, res, next) => {
    try {
        const newTodo = await Finishedtodo.create({
            name: req.body.name,
            title: req.body.title,
            isdone: req.body.isdone 
        });
        const name = req.body.name 
        const deletingElement = { name:name }; 
        const data = await Todo.deleteOne(deletingElement);

        if (data.deletedCount === 1) {
            res.send(newTodo);
        } else {
            res.status(404).send("Todo not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
app.delete("/deletefrommaintodos", async (req, res, next) => {
    try {
        const newTodo = await Deletetodo.create({
            name: req.body.name,
            title: req.body.title,
            isdone: req.body.isdone 
        });
        const name = req.body.name 
        const deletingElement = { name:name }; 
        const data = await Todo.deleteOne(deletingElement);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
app.delete("/deletefromfinishedtodos", async (req, res, next) => {
    try {
        const newTodo = await Deletetodo.create({
            name: req.body.name,
            title: req.body.title,
            isdone: req.body.isdone 
        });
        const name = req.body.name 
        const deletingElement = { name:name }; 
        const data = await Finishedtodo.deleteOne(deletingElement);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
app.delete("/deletefromdeletedtodos", async (req, res, next) => {
    try {
        const name = req.body.name 
        const deletingElement = { name:name }; 
        const data = await Deletetodo.deleteOne(deletingElement);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/restorefromfinished", async (req, res) => {
    try {
        const name = req.body.name 
        const deletingElement = { name: name }; 
        const adding = await Todo.create({
            name: req.body.name,
            title: req.body.title,
            isDone: req.body.isDone 
        });
        const data = await Finishedtodo.deleteOne(deletingElement);
        console.log(data)
        if (data.deletedCount === 1) {
            res.send(newTodo);
        } else {
            res.status(404).send("Todo not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }
})
app.put("/changeidone", async (req, res) => {
    try {
        const name = req.body.name 
        const newupdate = req.body.isdone
        const newupdatevalue = { isdone : newupdate}
        const updatingElement = { name: name }; 
        console.log(req.bo)
        const data =await Finishedtodo.findOneAndUpdate(
            updatingElement,
            newupdatevalue
        )
        res.send(data)
    } catch (error) {
        res.status(500).send(error);
    }
})



app.listen(port, () => {
    console.log("This app is runing on port 3000")
})