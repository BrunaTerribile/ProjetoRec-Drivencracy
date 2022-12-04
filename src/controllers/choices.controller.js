import { choicesCollection, pollsCollection, votesCollection } from "../database/db.js"
import { choiceSchema } from "../models/choices.model.js"

export async function createChoice(req, res) {
    const choice = req.body;
    const title = req.body.title;
    const pollId = req.body.pollId;

    if(title === "") {
        return res.status(422).send("Title vazio");
    }

    try {
        const pollExist = await pollsCollection.findOne({ _id: pollId }) //verifica se a enquete existe

        if(!pollExist) { 
            return res.status(404).send("Essa enquete não existe");
        }

        const titleExist = await choicesCollection.findOne({ title }) //verifica se a opção já existe

        if(titleExist) { 
            return res.status(409).send("Essa opção já existe");
        }

        const { error } = choiceSchema.validate(choice, { abortEarly: false });

        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
    
        await choicesCollection.insertOne(choice);
    
        res.status(201).send(choice);
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