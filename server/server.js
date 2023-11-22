const express = require('express');
const passport = require('passport')
const env = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors');
const router = require('./routes/users');
const checkoutRouter = require('./routes/checkout');

//load dotenv variables
env.config({
    path: './config/.env'
})
//connect database
connectDB()

const app = express();
app.use(cors());
app.use(passport.initialize())
require('./middleware/passport')(passport)
//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//routes 
app.use('/api/users', router)
app.use('/api/checkout', checkoutRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running on ${port}`);
})