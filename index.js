const express = require('express');
const app = express();
const lightController = require('./light-controller');
const bodyParser = require('body-parser');
const t = require('tcomb-validation');

app.use(bodyParser.json({type: 'application/*'}));

app.use(express.static('static'));
app.get('/', (req, res) => res.send('Hello World!'));

const validateSetUpBody = (body,res) => {
    const schema = t.struct({
        startAtHour: t.refinement(t.Number, x => x > 0 && x < 24),
        startAtMinute: t.refinement(t.Number, x => x >= 0 && x < 60),
        fadeInMinutes: t.refinement(t.Number, x => x >= 1),
    });
    const result = t.validate(body, schema);
    if (!result.isValid()) {
        res.send(400,result.errors);
        throw new Error('invalid-body');
    }
};

app.post('/set-up', (req, res) => {
    let body = req.body;
    validateSetUpBody(body,res);
    const startHour = body.startAtHour;
    const startMinute = body.startAtMinute;
    const fadeInMinutes = body.fadeInMinutes;
    lightController.setConfig(startHour, startMinute, fadeInMinutes);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

lightController.setConfig(6,30,40);