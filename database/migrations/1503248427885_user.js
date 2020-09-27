'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('username').notNullable()
      table.string('image_url').defaultTo('default_profile.jpg')
      table.string('email', 254).notNullable().unique()
      table.string('phone',).defaultTo()
      table.string('password', 60).notNullable()
      table.integer('vip').defaultTo(0) 
      
      table.integer('id_delete').defaultTo(1) 
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
