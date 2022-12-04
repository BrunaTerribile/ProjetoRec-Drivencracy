import { choicesCollection, votesCollection } from "../database/db.js"
import { choiceSchema } from "../models/choices.model.js"

export async function createChoice(req, res) {
    const choice = req.body;

    try {
        const { error } = choiceSchema.validate(choice, { abortEarly: false });

        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
    
        await choicesCollection.insertOne(choice);
    
        res.status(201).send("Resposta adicionada!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postVote(req, res) {
    const id = req.params.id
    var date = new Date()

    const vote = { 
        createdAt: date.toString(),
        choiceId: id, 
    }

    try {
        await votesCollection.insertOne(vote);
        res.send(vote)
        //res.status(201).send("Voto feito!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}