const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const {connectionString, DB, collection} = require('../config/config');

//Imports asyncHandler middleware function
const { asyncHandler } = require('../middleware/async-handler');

//DB Connection
MongoClient.connect(connectionString, {
  useUnifiedTopology: true })
  .then (client => {

      //Create DB
      const db = client.db(DB);

      //Create Notes Collection
      const notesCollection = db.collection('notes');

      // Route that returns all notes
      router.get('/notes', asyncHandler(async (req, res) => {
        const notes = await notesCollection.find().toArray()
        res.json(notes);
      }));

      // Route that returns note for specific id
    router.get('/notes/:id', asyncHandler(async (req, res) => {
      const {id} = req.params;
      const note = await notesCollection.findOne({ "_id": new ObjectId(id)});
      if (!note) {
        return res.status(404).send('Note not found.')
      }

      res.json(note);
    }));

      //Create new note
      router.post('/notes', asyncHandler(async (req, res) => {
        notesCollection.insertOne(req.body)
            .then(result => {
              const id = result.insertedId;
              console.log(res)
              res.location(`/notes/${id}`).status(201).end();
            })
            .catch(error => console.error(error))
    }));

      //Update notes
      router.put('/notes/:id', asyncHandler(async(req, res) => {
        const {id} = req.params;
        notesCollection.findOneAndUpdate(
          { "_id": new ObjectId(id)},
            {
              $set: {
                date: req.body.date,
                diet: req.body.diet,
                mood: req.body.mood,
                symptoms: req.body.symptoms,
                exercise: req.body.exercise
              }
            },
            {
              upsert: true
            }
          )
            .then(result => {
              if (id) {
                res.status(204).end();
              } else {
                res.status(404).json({message: `Note ID ${id} does not exist`});
              }
            })
            .catch(error => console.error(error))
    }));

    //Delete notes by id
    router.delete('/notes/:id', asyncHandler(async(req, res) => {
          const {id} = req.params;
          notesCollection.deleteOne(
            { "_id": new ObjectId(id)}, 
            )
              .then(result => {
                if (id) {
                  res.status(204).end();
                } else {
                  res.status(404).json({message: `Note ID ${id} does not exist`});
                }
              })
              .catch(error => console.error(error))
    }));



  })
  .catch(error => console.error(error))


module.exports = router;