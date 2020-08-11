'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {   
      table.increments()
      table.json('json_answer')
      table.integer('period_id').unsigned()
      table.integer('professor_id').unsigned()
      table.integer('discipline_id').unsigned()
      table.string('class_id').notNullable()
      table.integer('formulary_id').unsigned()
      table.timestamps()

      table
        .foreign('formulary_id')
        .references('id')
        .inTable('formularies')
      table
        .foreign('class_id')
        .references('id')
        .inTable('classes')
    })

    this.create('answer_register', (table) => {   
      table.string('verification_id').notNullable()
      table.integer('period_id').unsigned().notNullable()
      table.integer('professor_id').unsigned().notNullable()
      table.integer('discipline_id').unsigned().notNullable()
      table.string('class_id').notNullable()
      table.integer('formulary_id').unsigned().notNullable()

      table
        .foreign('formulary_id')
        .references('id')
        .inTable('formularies')
    })
  }

  down () {
    this.drop('answer_register')
    this.drop('answers')
  }
}

module.exports = AnswerSchema
