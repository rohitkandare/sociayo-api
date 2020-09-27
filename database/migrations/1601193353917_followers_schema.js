'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowersSchema extends Schema {
  up () {
    this.create('followers', (table) => {
      table.increments()
      table.integer('uid')
      table.integer('followers_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('followers')
  }
}

module.exports = FollowersSchema
