'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Class extends Model {

    // static get table() {
    //     return 'classes'
    // } 

    static get incrementing () {
        return false
    }

    answers() {
        return this.hasMany('App/Models/Answer')
    }

    period() {
        return this.belongsTo('App/Models/Period')
    }

    professor() {
        return this.belongsTo('App/Models/Professor')
    }

    discipline() {
        return this.belongsTo('App/Models/Discipline')
    }
}

module.exports = Class
