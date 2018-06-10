'use strict'

const assert = require('assert')
const superagent = require('superagent')
const app = require('./app')

let server
beforeEach(() => {
  server = app.listen(9000)
})

describe('koa-router-map', function () {

  describe('Table mode', function () {
    it('Should return routes data in table mode', async () => {
      const res = await superagent.get('http://localhost:9000/routes/map')
      const expectedValue = `╔═══════════╤═══════════════╤═══════════════════╤═══════════════════╗
║ Methods   │ Path          │ Name              │ Stack             ║
╟───────────┼───────────────┼───────────────────┼───────────────────╢
║ HEAD, GET │ /examples     │ Get all Examples  │ getAllExamples    ║
╟───────────┼───────────────┼───────────────────┼───────────────────╢
║ POST      │ /examples     │ Create examples   │ createExample     ║
╟───────────┼───────────────┼───────────────────┼───────────────────╢
║ DELETE    │ /examples/:id │ Delete examples   │ deleteExampleById ║
╟───────────┼───────────────┼───────────────────┼───────────────────╢
║ HEAD, GET │ /examples/:id │ Get example by id │ getExampleById    ║
╚═══════════╧═══════════════╧═══════════════════╧═══════════════════╝`
      assert.equal(res.text, expectedValue)
      assert.equal(res.status, 200)
    })
  })

  describe('Raw mode', function () {
    it('Should return routes data in raw mode', async () => {
      const res = await superagent.get('http://localhost:9000/routes/map?raw=true')
      const expectedValue = `Methods | Path | Name | Stack
HEAD, GET | /examples | Get all Examples | getAllExamples
POST | /examples | Create examples | createExample
DELETE | /examples/:id | Delete examples | deleteExampleById
HEAD, GET | /examples/:id | Get example by id | getExampleById`
      assert.equal(res.text, expectedValue)
      assert.equal(res.status, 200)
    })
  })

  describe('General', function () {
    it('Should not intercept others request than /routes/map', async () => {
      const res = await superagent.get('http://localhost:9000/test').catch(err => err.response)
      assert.equal(res.status, 404)
    })
  })
})

afterEach(() => {
  server.close()
})
