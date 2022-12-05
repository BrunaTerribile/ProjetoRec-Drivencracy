import { ObjectId } from "mongodb";
import { pollsCollection, choicesCollection, votesCollection } from "../database/db.js"
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
        const pollData = await pollsCollection.findOne({ _id: ObjectId(pollId) })//pega as infos da enquete

        if(!pollData || pollData == []){ //caso a enquete não exista
            return res.sendStatus(404);
        }

        const options = await choicesCollection.find({pollId}).toArray(); //pega as opções da enquete escolhida
        const choicesIdsArr = options.map(c => String(c._id)) //exibe apenas os ids das opções
        console.log(choicesIdsArr)

        const choicesRanking = await  votesCollection.aggregate([
            { $match: {choiceId: {$in: choicesIdsArr}} },
            { $group: {_id: "$choiceId", votes: {$sum: 1}} },
            { $sort: {votes: -1}}
        ]).toArray()

        const mostVoted = choicesRanking[0]
        const choiceData = await choicesCollection.findOne({_id: ObjectId(mostVoted._id) });

        const resultData = {result: {
            title: choiceData.title,
            votes: mostVoted.votes
        }}

        var result = Object.assign({}, pollData, resultData);
        
        res.send(result)
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}