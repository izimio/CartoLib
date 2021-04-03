const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const multer = require('multer')
const fs = require('fs')

const {
     Op
} = require("sequelize")


exports.createCarte = (req, res, next) => {
     const name = req.body.name
     const body = req.body.body
     //const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null) // ternary operator to adjust the media with the right value
     const year = req.body.year;
     const month = (req.body.month ? req.body.month : null);
     models.Cartes.create({ // creating the post 
               name: name,
               media: "aa",
               body: body,
               year: year,
               month: month
          })
          .then(post => {
               res.status(201).json({
                    message: "Post crée avec succès"
               })
          })
          .catch(error => res.status(500).json({
               error
          }))
}

exports.getAllCartes = (req, res, next) => {
     models.Cartes.findAll({ // getting all the post and order them by update
               attributes: ['id', 'name', 'body', 'year', 'media', 'month', 'updatedAt'],
               order: [
                    ['updatedAt', 'DESC']
               ],
          })
          .then(carte => {
               if (carte == null) { // if there are no post
                    return res.status(404).json({
                         error: 'Ce post n\'existe pas !'
                    })
               }
               res.status(200).json({ // then
                    carte
               })
          })
          .catch(error => {
               res.status(400).json({
                    error: error
               })
          })

}

exports.getOneCarte = (req, res, next) => {
     models.Cartes.findOne({ // getting one post linked with the right Id
          attributes: ['id', 'name', 'body', 'year', 'media', 'month', 'updatedAt'],
               where: {
                    id: req.params.id
               },
          })
          .then(Carte => {
               if (Carte == null) { // if there are no post
                    return res.status(404).json({
                         error: 'Ce Post n\'existe pas !'
                    })
               }
               res.status(200).json({ // then
                    Carte
               })
          })
          .catch(error => res.status(403).json({
               error: 'Post non trouvé'
          }))
}


exports.deleteCarte = (req, res, next) => {
     models.Cartes.findOne({ // find the post related to the req.params.id
          attributes: ['id', 'name', 'body', 'year', 'media', 'month', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(carte => {
                    if (carte.media != null) {
                         const filename = carte.media.split('/images/')[1]; // deleting the linked file inside our folder
                         fs.unlink(`images/${filename}`, () => {})
                    }
                    return carte.destroy() // Destroying the post
                         .then(() => res.status(200).json({
                              message: 'Post supprimé !'
                         }))
                         .catch(error => {
                              res.status(400).json({
                                   error: 'Un problème est survenue lors de la suppression'
                              })
                         });
          })
          .catch(error => {
               res.status(404).json({
                    error: 'Post non trouvé !'
               })
          });
}