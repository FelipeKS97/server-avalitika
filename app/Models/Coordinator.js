'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coordinator extends Model {
    static get incrementing () {
        return false
    }

    course() {
        return this.belongsTo('App/Models/Course')
    }

    professor() {
        return this.belongsTo('App/Models/Professor')
    }
}

module.exports = Coordinator
