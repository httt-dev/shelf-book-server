const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({
    path: '.env-local'
});

const PORT = process.env.PORT || '3000';

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Routes */
// app.get('/', (request, response) => {
//     response.status(200).json({
//         name: "Hoa",
//         doing: "Nothing to do"
//     });
// })

app.get('/', (req, res) => {
    res.status(200).send("Head to /user/:id and replace :id with your user")
});

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const bookRouter = require('./routes/book')
app.use('/books', bookRouter);


/** Start  listening*/
app.listen(PORT, () => {
    console.log(`Listening for request on port ${PORT}`);
})