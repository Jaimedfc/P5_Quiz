
module.exports = (sequelize, DataTypes) => {


    return sequelize.define('quiz', {
        question : {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}
        },
        answer: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}}
        }
    });
}

