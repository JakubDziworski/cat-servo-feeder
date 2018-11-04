const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const t = require('tcomb-validation');
const servoController = require('./servo-controller');
const soundController = require('./sound-controller');
const config = require('./config');

app.use(bodyParser.json({type: 'application/*'}));

app.use(express.static('static'));
app.get('/', (req, res) => res.send('Hello World!'));

const validateSetUpBody = (body,res) => {
    const schema = t.struct({
        openPercentage: t.refinement(t.Number, x => x >= 0 && x <= 100)
    });
    const result = t.validate(body, schema);
    if (!result.isValid()) {
        res.send(400,result.errors);
        throw new Error('Invalid-body. Percentage should be between 0 and 100');
    }
};

app.put('/bowls/:bowlId/state', (req, res) => {
    let body = req.body;
    const bowlId = req.params.bowlId;
    validateSetUpBody(body,res);
    console.log(`setting bowl ${bowlId} to  + ${body.openPercentage}`);
    servoController.change(bowlId,body.openPercentage);
    res.sendStatus(200);
});


app.get('/bowls',(req,res) => {
  res.status(200).send(config);
});

app.post('/sounds/summon',(req,res) => {
  soundController.summon();
  res.sendStatus(200);
});

app.post('/sounds/banish',(req,res) => {
  soundController.banish();
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));