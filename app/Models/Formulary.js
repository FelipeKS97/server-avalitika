'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Formulary extends Model {
    static get dates() {
        return ['created_at', 'updated_at', 'published_at', 'published_until']
    }

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
