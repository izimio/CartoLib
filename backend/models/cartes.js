const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const cartes = sequelize.define("Cartes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commune: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pays: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return cartes;
};