const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("../db/conn");
const StudentReg = require("../model/student");
const router = require("../src/router/router");

const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../templates/views");
// const partials_path = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 8000;

app.set('view engine', 'hbs');
app.set("views", view_path);
// hbs.registerPartials(partials_path);

app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static_path));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        console.log(`username: ${username} and password: ${password}`);

        const name = await StudentReg.find({username: username});
        console.log(name[0]);

        if (name) {
            if (name[0].password === password) {
                res.send("you logged");
                console.log(name[0]);
            } else {
                res.send("password incorrect");
            }
        } else {
            res.send("you must enter correct password or you have to signin");
        }
    }
    catch (e) {
        res.status(500).send();
    }
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const studentRegister = new StudentReg({
                username: req.body.username,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            });

            const registered = await studentRegister.save();
            console.log(registered);
            res.status(200).send(registered);
        } else {
            res.send("Your password is not matched.");
        }
    } catch (e) {
        res.status(400).send(e);
    }
});


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})