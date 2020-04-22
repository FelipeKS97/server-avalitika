'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Period extends Model {

    formularies() {
        return this.hasMany('App/Models/Formulary')
    }

    classes() {
        return this.hasMany('App/Models/Class')
    }
}

module.exports = Period
