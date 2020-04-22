'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormularySchema extends Schema {
  up () {
    this.create('formularies', (table) => {
      table.increments()
      table.string('title', 100)
      table.boolean('is_general_form').defaultTo(false)
      table.boolean('status').defaultTo(false)
      table.json('json_format')
      table.integer('period_id').unsigned()
      table.integer('curriculum_id').unsigned()
      table.timestamps()

      table
        .foreign('period_id')
        .references('id')
        .inTable('periods')
        .onDelete('cascade')
      
      table
        .foreign('curriculum_id')
        .references('id')
        .inTable('curricula')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('formularies')
  }
}

module.exports = FormularySchema
