'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.integer('discipline_id').unsigned()
      table.integer('period_id').unsigned()
      table.integer('professor_id').unsigned()
      table.boolean('is_inactive').defaultTo(false)
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
    this.drop('classes')
  }
}

module.exports = ClassSchema
