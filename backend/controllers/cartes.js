const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const multer = require('multer')
const fs = require('fs')

const {
     Op
} = require("sequelize")


exports.createCarte = (req, res, next) => {
     if (!req.file || !req.body.name || !req.body.type || !req.body.commune || !req.body.pays || !req.body.departement) { // checking fi the new post is long enought
          return res.status(400).json({
               error: 'Champs  manquant ou erroné'
          })
     }
     const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null) // ternary operator to adjust the media with the right value
     models.Cartes.create({ // creating the post 
               name: req.body.name,
               media: media,
               year: req.body.year,
               type: req.body.type,
               commune: req.body.commune,
               pays: req.body.pays,
               departement: req.body.departement
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
               attributes: ['id', 'name', 'year', 'media', 'commune', 'pays', 'type', 'departement', 'updatedAt', 'createdAt'],
               order: [
                    ['name']
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

exports.getAllCartesByCreation = (req, res, next) => {
     models.Cartes.findAll({ // getting all the post and order them by update
               attributes: ['id', 'name', 'year', 'media', 'commune', 'pays', 'type', 'departement', 'updatedAt', 'createdAt'],
               order: [
                    ['createdAt', 'DESC']
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
               attributes: ['id', 'name', 'year', 'media', 'commune', 'pays', 'type', 'departement', 'updatedAt', 'createdAt'],
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
               attributes: ['id', 'name', 'year', 'media', 'commune', 'pays', 'type', 'departement', 'updatedAt', 'createdAt'],
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

exports.updateCarte = (req, res, next) => {

     const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)

     console.log(req.params.id)
     if (!req.body.name || !req.body.type || !req.body.commune || !req.body.pays || !req.body.departement) { // checking fi the new post is long enought
          return res.status(400).json({
               error: 'Champs  manquant ou erroné'
          })
     }
     models.Cartes.findOne({ // find the post related to the req.params.id
               attributes: ['id', 'name', 'year', 'media', 'commune', 'pays', 'type', 'departement', 'updatedAt', 'createdAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(carte => {
               if ((media != carte.media) && media != null ) {
                    const filename = carte.media.split('/images/')[1]; // deleting the linked file
                    fs.unlink(`images/${filename}`, () => {})
               }
               return carte.update({
                         name: req.body.name,
                         media: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : carte.media),
                         year: req.body.year,
                         type: req.body.type,
                         commune: req.body.commune,
                         pays: req.body.pays,
                         departement: req.body.departement
                    })
                    .then(() => res.status(200).json({
                         message: 'carte modifié !'
                    }))
                    .catch(error => res.status(400).json({
                         error: 'Une erreur est survenue lors de la modification de la carte'
                    }));
          })
          .catch(error => {
               res.status(404).json({
                    error: 'Post non trouvé !'
               })
          });
}