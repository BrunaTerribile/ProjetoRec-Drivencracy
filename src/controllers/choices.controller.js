import { choicesCollection } from "../database/db.js"
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

export async function getChoices(req, res) {
    const { pollId } = req.params

    try {
        const options = await choicesCollection.find().sort({ pollId }).toArray();
        res.send(options)
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }

}

export async function voteChoice(req, res) {
}
