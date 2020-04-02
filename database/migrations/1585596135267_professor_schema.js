'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorSchema extends Schema {
  up () {
    this.create('professors', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.timestamps()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('professors')
  }
}

module.exports = ProfessorSchema
