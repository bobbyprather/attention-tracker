const express = require('express');
const router = express.Router();
const dataManager = require('../DataManager')
router.get("/count", (req, res) => {
    //TODO: Check if database has data if not load it

    const dbRecs = dataManager.dbHasData();
    res.json(dbRecs);
});

router.get("/init", (req, res) => {
    //TODO: Check if database has data if not load it

    dataManager.readCSV();

    res.json({ "message": "Database loaded" });
});

router.get("/", (req, res) => {
    //Get Count of Each Application and usage
    const notesUsage = dataManager.fetchNotesUsage();
    const totalRecs =  dataManager.dbHasData();

    let notesObj = {...totalRecs,notesUsage};
    res.json(notesObj);
});


module.exports = router;