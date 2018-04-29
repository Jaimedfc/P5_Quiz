const path = require('path');

const Sequelize = require('sequelize');

const sequelize = new Sequelize("sqlite:quiz.sqlite");

sequelize.import(path.join(__dirname, 'quiz'));

sequelize.sync()
    .then(() => sequelize.models.quiz.count())
    .then(count => {
        if (!count){
            return sequelize.models.quiz.bulkCreate([
                {question: "Capital de Italia", answer: "Roma"},
                {question: "Capital de Francia", answer: "París"},
                {question: "Capital de España", answer: "Madrid"},
                {question: "Capital de Portugal", answer: "Lisboa"}
            ]);
        }
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });

module.exports = sequelize;