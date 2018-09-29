const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const t = require('tcomb-validation');
const servoController = require('./servo-controller');

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

app.put('/bowl/state', (req, res) => {
    let body = req.body;
    validateSetUpBody(body,res);
    console.log("setting to " + body.openPercentage);
    servoController.change(body.openPercentage);
    res.sendStatus(200);
});


app.get('/bowl/state',(req,res) => {
  const percentage = servoController.getOpenPercentage();
  console.log("current state" + percentage);
  res.status(200).send({catName:'Duzalek',openPercentage:percentage});
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));