'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Discipline extends Model {
    classes() {
        return this.hasMany('App/Models/Class')
    }

    curriculum() {
        return this.belongsTo('App/Models/Curriculum')
    }
}

module.exports = Discipline
