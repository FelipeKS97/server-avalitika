'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
    
    class() {
        return this.belongsTo('App/Models/Class')
    }

    formulary() {
        return this.belongsTo('App/Models/Formulary')
    }
}

module.exports = Answer
