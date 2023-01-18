const cors = require('cors');
const express = require('express');
const app = express();
const port = 3500;
const notesRouter =require('./routes/Notes');

app.use(cors());
app.use('/notes',notesRouter);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})