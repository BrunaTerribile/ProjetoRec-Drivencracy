import { choicesCollection, pollsCollection, votesCollection } from "../database/db.js"
import { choiceSchema } from "../models/choices.model.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function createChoice(req, res) {
    const choice = req.body;
    const title = req.body.title;
    const pollId = req.body.pollId;
    const today = dayjs().locale("pt-br").format("YYYY-MM-DD")

    if(title === "") {
        return res.status(422).send("Title vazio");
    }

    try {
        const pollExist = await pollsCollection.findOne({ _id: ObjectId(pollId) })//verifica se a enquete existe

        if(!pollExist) { 
            return res.status(404).send("Essa enquete não existe");
        }

        const pollDate = (pollExist.expireAt).split('/'); //pega somente a data de expiração da enquete

        if(pollDate < today){ //verifica se a enquete expirou
            return res.status(403).send("Essa enquete já expirou");
        }

        const titleExist = await choicesCollection.findOne({ title }) //verifica se a opção já existe

        if(titleExist) { 
            return res.status(409).send("Essa opção já existe");
        }

        const { error } = choiceSchema.validate(choice, { abortEarly: false }); //validação joi

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
    const choiceId = req.params.id
    var date = new Date()
    const today = dayjs().locale("pt-br").format("YYYY-MM-DD")

    const choiceExist = await choicesCollection.findOne({ _id: ObjectId(choiceId) })

    if(!choiceExist || choiceExist == []){ //caso a opção não exista
        return res.sendStatus(404);
    }

    const pollExist = await pollsCollection.findOne({ _id: ObjectId(choiceExist.pollId) })//verifica se a enquete existe
    const pollDate = (pollExist.expireAt).split('/'); //pega somente a data de expiração da enquete

    if(pollDate < today){ //verifica se a enquete expirou
        return res.status(403).send("Essa enquete já expirou");
    }

    const vote = { 
        createdAt: date.toString(),
        choiceId: choiceId, 
    }

    try {
        await votesCollection.insertOne(vote);
        res.status(201).send(vote);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}