const config = require("../knexfile")
const knex = require("knex")

const environment = process.env.NODE_ENV || 'development' 
const config = config[environment] || config.development

const db = knex(config.development)

module.exports = db