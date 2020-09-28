'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('uid')
      table.string('file').notNullable()
      table.string('post_description')
      table.string('like').defaultTo(0) 
      table.string('dislike').defaultTo(0) 
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
