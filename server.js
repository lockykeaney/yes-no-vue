// Packages
const Express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Variables
const app = new Express()
const router = Express.Router()
const port = process.env.PORT || 5678
const env = app.get('env')

// App Config
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

// Database
mongoose.connect('mongodb://localhost/gobstopper')

// Question Schema
const QuestionSchema = mongoose.Schema = {
    question: { type: String },
    yesVotes: { type: Number, default: 0 },
    noVotes: { type: Number, default: 0 }
}
let Question = mongoose.model('Question', QuestionSchema)

// Routes
router.route('/')
    .get((req, res) => {
        res.json({ message: 'home' })
    })

router.route('/all')
    .get((req, res) => {
        Question.find()
            .then((list) => {
                res.json(list)
            })
    })

router.route('/new')
    .post((req, res) => {
        let content = req.body.question
        const question = new Question({question: content})
        question.save()
            .then((question) => {
                res.json(question)
            })
    })

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id
        Question.findById(id)
            .then((question) => {
                res.json(question)
            })
    })

router.route('/:id/yesVote')
    .post((req, res) => {
        const id = req.params.id
        Question.findByIdAndUpdate(id, {$inc: {yesVotes: 1}})
            .then((question) => {
                res.json(question.yesVotes)
            })
    })

router.route('/:id/noVote')
    .post((req, res) => {
        const id = req.params.id
        Question.findByIdAndUpdate(id, {$inc: {noVotes: 1}})
            .then((question) => {
                res.json(question.noVotes)
            })
    })

// Launch
app.listen(port, () => {
    console.log('running on port: ' + port)
    console.log(env)
})

module.exports = app
