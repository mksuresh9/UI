const express= require("express");
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

const app =express();

app.use(bodyparser.json());


app.get('/time', (req, res) => {

    const time = (new Date()).toLocaleTimeString();
    res.status(200).send(`the time is ${time}`);
});

app.get('/', (req, res) => {
    res.status(400).send(`can not found this router`);
});

const users = [{ 
    id:1,
    username: "chetan",
    password: "123456"
}]

app.post('/reg', (req, res) => {
    
    if(!req.body.username || !req.body.password){
    res.status(400).send(`please enter the corrct details`);
    }


 const user = users.find((u)=>{
     return u.username === req.body.username && u.password ===req.body.password 
 });


 const token = jwt.sign({
     sub: user. id,
     username: user.username},
     "mykey",{expiresIn :"1 hour"});

res.status(200).send({"access token": token});
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});