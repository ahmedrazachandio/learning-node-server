// import express from 'express'
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('This is Ahmed Raza Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



import express from 'express';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000;

let todos = [];

app.use(express.json());
app.use(cors())

app.post('/todo', (req, res) => {
    
    todos.push(req.body.text);

    res.send({
        message: "your todo is saved",
        data: todos
    })
})
app.get('/todos', (req, res) => {
    
    res.send({
        message: "here is you todo list",
        data: todos
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
