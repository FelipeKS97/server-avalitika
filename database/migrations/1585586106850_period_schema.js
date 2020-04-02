'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeriodSchema extends Schema {
  up () {
    this.create('periods', (table) => {
      table.increments()
      table.string('description', 255)
      table.boolean('status').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('periods')
  }
}

module.exports = PeriodSchema
