'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplineSchema extends Schema {
  up () {
    this.create('disciplines', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('slug', 100)
      table.integer('curriculum_id').unsigned()
      table.timestamps()

      table
        .foreign('curriculum_id')
        .references('id')
        .inTable('curricula')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('disciplines')
  }
}

module.exports = DisciplineSchema
