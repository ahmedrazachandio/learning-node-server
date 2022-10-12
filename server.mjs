// import express from 'express'
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('This is Ahmed Raza Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//POST  https://anxious-hospital-gown-calf.cyclic.app/todo

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3003;

// let todos = [];


let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    createdOn: { type: Date, default: Date.now }

}
);
const todoModel = mongoose.model('todos', todoSchema);



app.use(express.json());
app.use(cors())

// app.post('/todo', (req, res) => {

//     todos.push(req.body.text);

//     res.send({
//         message: "your todo is saved",
//         data: todos
//     })
// })
app.post('/todo', (req, res) => {
    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            res.send({
                message: "your todo is saved",
            })
        } else {
            res.status(500).send({
                message: "error ha server  koi",
            })

        }
    })

    res.send({
        message: "here is you todo list",
    })
})

app.get('/', (req, res) => {

    res.send("Server is ok")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// mongodb+srv://todoapp:<password>@cluster0.g3kfhon.mongodb.net/?retryWrites=true&w=majority

/////////////////////////////////////////////////////////////////////////////////////////////////
// Mongodb

let dbURI = 'mongodb+srv://todoapp:ahmad87626@cluster0.g3kfhon.mongodb.net/todoapp?retryWrites=true&w=majority';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});