import { pollsCollection } from "../database/db.js"
import { pollsSchema } from "../models/polls.model.js";

export async function createPoll(req, res) {
    const poll = req.body;

    try {
        const { error } = pollsSchema.validate(poll, { abortEarly: false });

        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
    
        await pollsCollection.insertOne(poll);
    
        res.status(201).send("Enquete criada com sucesso!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getPolls(req, res) {

    try {
        const allPolls = await pollsCollection.find({}).toArray();
        res.send(allPolls)
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getOptions(req, res) {
}

export async function getResult(req, res) {
}