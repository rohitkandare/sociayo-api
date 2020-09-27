'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowingSchema extends Schema {
  up () {
    this.create('followings', (table) => {
      table.increments()
      table.integer('uid')
      table.integer('following_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('followings')
  }
}

module.exports = FollowingSchema
