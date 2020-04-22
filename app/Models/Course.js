'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {
    curricula() {
        return this.hasMany('App/Models/Curriculum')
    }

    coordinators() {
        return this.hasMany('App/Models/Coordinator')
    }
}

module.exports = Course
