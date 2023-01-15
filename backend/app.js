const express = require('express');
const app = express();
const port = 3000;
const notesRouter =require('./routes/Notes');

app.use('/notes',notesRouter);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})