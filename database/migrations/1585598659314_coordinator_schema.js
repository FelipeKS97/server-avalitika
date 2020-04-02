'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoordinatorSchema extends Schema {
  up () {
    this.create('coordinators', (table) => {
      table.integer('professor_id').unsigned()
      table.integer('course_id').unsigned()
      table.timestamps()

      table
        .foreign('professor_id')
        .references('id')
        .inTable('professors')
        .onDelete('cascade')
      table
        .foreign('course_id')
        .references('id')
        .inTable('courses')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('coordinators')
  }
}

module.exports = CoordinatorSchema
