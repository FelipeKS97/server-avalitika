'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Professor extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    coordinators() {
        return this.hasMany('App/Models/Coordinator')
    }

    classes() {
        return this.hasMany('App/Models/Class')
    }
}

module.exports = Professor
