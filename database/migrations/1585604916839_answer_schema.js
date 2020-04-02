'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.json('json_answer')
      table.string('verification_id').unique()
      table.integer('period_id').unsigned()
      table.integer('professor_id').unsigned()
      table.integer('discipline_id').unsigned()
      table.integer('formulary_id').unsigned()
      table.timestamps()

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
      table
        .foreign('discipline_id')
        .references('id')
        .inTable('disciplines')
        .onDelete('cascade')
      table
        .foreign('formulary_id')
        .references('id')
        .inTable('formularies')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
