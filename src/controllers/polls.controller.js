import { pollsCollection, choicesCollection } from "../database/db.js"
import { pollsSchema } from "../models/polls.model.js";

export async function createPoll(req, res) {
    const poll = req.body;
    const today = new Date()

    if(poll.expireAt === ""){
        expireAt = today
    }

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

export async function getChoices(req, res) {
    const pollId = req.params.id

    try {
        const options = await choicesCollection.find({ pollId }).toArray();

        if(!options ){
            return res.sendStatus(404);
        }

        res.send(options)
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getResult(req, res) {
    const pollId = req.params.id

    try {
        const pollData = await pollsCollection.find({ pollId }).toArray();

        if(pollData === []){
            res.sendStatus(404);
            return;
        }

        const votes = await choicesCollection.find({ pollId }).toArray();

        const pollResult = {
            pollData,
            result: {
                title: xxxx,
                votes: 10
            }
        }


        res.send(pollResult)
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}