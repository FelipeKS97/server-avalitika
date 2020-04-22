'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Formulary extends Model {
    answers() {
        return this.hasMany('App/Models/Answer')
    }

    period() {
        return this.belongsTo('App/Models/Period')
    }

    curriculum() {
        return this.belongsTo('App/Models/Curriculum')
    }

}

module.exports = Formulary
