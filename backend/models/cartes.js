const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const cartes = sequelize.define("Cartes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return cartes;
};