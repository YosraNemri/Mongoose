const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
//test
router.get("/test", (req, res) => {
    res.send("this is test");
});

//@ Create and Save a Record of a Model
//@meth post
//@req.body

router.post("/", async (req, res) => {
    try {
        const { name, age, email, favoriteFoods } = req.body;
        const person = new Person({ name, age, email, favoriteFoods });
        await person.save();
        res.status(200).send({ msg: "person added", person });
    } catch (error) {
        console.log(error);
    }
});

//@Create Many Records with insertMany()
//@ meth post

router.post("/added", async (req, res) => {
    try {
        await Person.insertMany([
            {
                name: "habib",
                age: 72,
                email: "habib@gmail.com",
                favoriteFoods: ["hlelem", "borghol"],
            },
            {
                name: "mounira",
                age: 46,
                email: "mounira@gmail.com",
                favoriteFoods: ["makrouna", "jelbena"],
            },
        ]);
        res.status(200).send("persons added");
    } catch (error) {
        res.status(500).send("impossible to add many persons");
    }
});

//@ model.find() to Search the Database
//@ meth get

router.get("/", async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).send({ msg: "all Persons", persons });
    } catch (error) {
        res.status(500).send("can't get all persons");
    }
});
//@ Use model.findOne() to Return a Single Matching Document from Your Database
//@ meth get

router.get("/", async (req, res) => {
    try {
        const person = await Person.findOne();
        res.status(200).send({ msg: "person searched", person });
    } catch (error) {
        res.status(500).send("person not found");
    }
});

//@Use model.findById() to Search Your Database By _id
//@meth get

router.get("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findById({ _id: id });
    } catch (error) {
        res.status(500).send("fail to get person");
    }
});

//Perform Classic Updates by Running Find, Edit, then Save
//@ meth put
//@req.params

router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.find({ _id: id }, (result, err) => {
            if (err) {
                console.log(err);
            } else {
                result.favoriteFoods.push("merguez");
            }
        }).save();
        res.status(200).send({ msg: "person updated", person });
    } catch (error) {
        res.status(500).send("fail to update person");
    }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
//@ meth put
//@ req.body
//@ req.params

router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findOneAndUpdate(
            { _id: id },
            { $set: { ...req.body } }
        );
        res.status(200).send({ msg: "person updated", person });
    } catch (error) {
        res.status(500).send("fail to update person");
    }
});

// Delete One Document Using model.findByIdAndRemove
//@ meth delete
//@ req.params

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findByIdAndRemove({ _id: id });
        res.status(200).send({ msg: "person deleted", person });
    } catch (error) {
        res.status(500).send("imp to delete person");
    }
});

//Delete Many Documents with model.remove()
//@ meth delete

router.delete("/", async (req, res) => {
    try {
        const person = await Person.remove({ name: "mohamed" });
        res.status(200).send({ msg: "person deleted" });
    } catch (error) {
        res.status(500).send("fail to delete person");
    }
});

module.exports = router;
