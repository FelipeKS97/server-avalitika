'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplinePeriodProfessorSchema extends Schema {
  up () {
    this.create('discipline_period_professor', (table) => {
      table.integer('discipline_id').unsigned()
      table.integer('period_id').unsigned()
      table.integer('professor_id').unsigned()
      table.timestamps()

      table
        .foreign('discipline_id')
        .references('id')
        .inTable('disciplines')
        .onDelete('cascade')
      table
        .foreign('period_id')
        .references('id')
        .inTable('periods')
        .onDelete('cascade')
      table
        .foreign('professor_id')
        .references('id')
        .inTable('professors')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('discipline_period_professor')
  }
}

module.exports = DisciplinePeriodProfessorSchema
