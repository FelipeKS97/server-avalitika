'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurriculumSchema extends Schema {
  up () {
    this.create('curricula', (table) => {
      table.increments()
      table.string('name', 255)
      table.integer('course_id').unsigned()
      table.timestamps()

      table
        .foreign('course_id')
        .references('id')
        .inTable('courses')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('curricula')
  }
}

module.exports = CurriculumSchema
