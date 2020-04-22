'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Curriculum extends Model {
    disciplines() {
        return this.hasMany('App/Models/Discipline')
    }

    formularies() {
        return this.hasMany('App/Models/Formulary')
    }

    course() {
        return this.belongsTo('App/Models/Course')
    }
}

module.exports = Curriculum
