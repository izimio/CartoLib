const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const multer = require('multer')
const fs = require('fs')

const {
     Op
} = require("sequelize")


exports.createCarte = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting the token
     const userId = decodedToken.userId

     const title = req.body.title
     const body = req.body.body
     const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null) // ternary operator to adjust the media with the right value
     if (title.length <= 2 || body.body <= 2) { // checking the length of the post 
          return res.status(400).json({
               error: 'Champs manquant ou incorrect'
          })
     }
     models.User.findOne({
               attributes: ['id'],
               where: {
                    id: userId
               }
          })
          .then(user => {
               models.Post.create({ // creating the post 
                         UserId: userId,
                         include: [{
                              model: models.User,
                              where: {
                                   id: userId
                              },
                         }],
                         title: title,
                         body: body,
                         media: media,
                    })
                    .then(post => {
                         res.status(201).json({
                              message: "Post crée avec succès"
                         })
                    })
                    .catch(error => res.status(500).json({
                         error
                    }))
          })
          .catch(error => res.status(400).json({
               error: 'Utilisateur inconnu !'
          }))
}