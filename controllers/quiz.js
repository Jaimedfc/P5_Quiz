const Sequelize = require('sequelize');
const {models} = require("../models");

exports.load = (req, res, next ,quizId) => {

    models.quiz.findById(quizId)
        .then(quiz => {

            if (quiz) {
             req.quiz = quiz;
             next();
            } else{
                throw new Error('There is no quiz qith id = ' + quizId);
            }
    })
    .catch(error => next(error));
};

exports.index = (req, res, next) => {

    models.quiz.findAll()
    .then(quizzes => {
        res.render('quizzes/index', {quizzes});
    })
    .catch(error => next(error));

};

exports.show = (req, res, next) => {

    const {quiz} = req;
    res.render('quizzes/show', {quiz});
};

exports.new = (req, res, next) => {

    const quiz = {
        question: "",
        answer:""
    };

    res.render('quizzes/new', {quiz});
};

exports.create = (req, res, next) => {

    const {question,answer}=req.body;
    const quiz = models.quiz.build({
        question,
        answer
    });
    quiz.save({fields: ["question","answer"]})
    .then(quiz => res.redirect('/quizzes/' + quiz.id))
    .catch(Sequelize.ValidationError, error => {
        console.log('There are errors in the form:');
        error.errors.forEach(({message}) => console.log(message));
        res.render('quizzes/new', {quiz});
    })
    .catch(error => next(error));
};

exports.edit = (req, res, next) => {

    const {quiz} = req;
    res.render('quizzes/edit', {quiz});
};

exports.update = (req, res, next) => {

    const {quiz, body} = req;

    quiz.question=body.question;
    quiz.answer=body.answer;

    quiz.save({fields: ["question","answer"]})
    .then(quiz => res.redirect('/quizzes/' + quiz.id))
    .catch(Sequelize.ValidationError, error => {
        console.log('There are errors in the form:');
        error.errors.forEach(({message}) => console.log(message));
        res.render('quizzes/edit', {quiz});
    })
    .catch(error => next(error));
};

exports.destroy = (req, res, next) => {

   req.quiz.destroy()
   .then(()=> res.redirect('/quizzes'))
   .catch(error => next(error));
};

exports.play = (req, res, next) => {

    const {quiz, query} = req;
    const answer = query.answer || '';

    res.render('quizzes/play', {
        quiz,
        answer
    });
};

exports.check = (req, res, next) => {

    const {quiz, query} = req;
    const answer = query.answer || '';

    const result = answer.toLowerCase().trim() === quiz.answer.toLowerCase().trim();

    res.render('quizzes/result', {
        quiz,
        result,
        answer
    });
};