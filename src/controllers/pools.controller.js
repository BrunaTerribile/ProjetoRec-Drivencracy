import { pollsCollection } from "../database/db.js"
import { poolsSchema } from "../models/pools.model.js";

export async function createPool(req, res) {
    const pool = req.body;

    try {
        const { error } = poolsSchema.validate(pool, { abortEarly: false });

        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
    
        await pollsCollection.insertOne(pool);
    
        res.status(201).send("Enquete criada com sucesso!");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getPools(req, res) {
}

export async function getOptions(req, res) {
}

export async function getResult(req, res) {
}