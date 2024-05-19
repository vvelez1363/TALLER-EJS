const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
    const accessFilePath = path.join(__dirname, '../data', 'access.json');
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const accessData = JSON.parse(fs.readFileSync(accessFilePath, 'utf-8'));
    accessData.access.push({ time: currentTime });
    fs.writeFileSync(accessFilePath, JSON.stringify(accessData, null, 2));

    const personsFilePath = path.join(__dirname, '../data', 'persons.json');
    const personsData = JSON.parse(fs.readFileSync(personsFilePath, 'utf-8'));
    const ageDaysThreshold = parseInt(process.env.AGE_DAYS_THRESHOLD);
    const filteredPersons = personsData.persons.filter(person => person.age * 365 > ageDaysThreshold);

    res.render('persons', { persons: filteredPersons });
});

module.exports = router;