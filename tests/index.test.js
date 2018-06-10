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
      const res = await superagent.get('http://localhost:9000/routes/map?color=true')
console.log(res.text)

      const expectedValue = `╔═══════════╤═══════════════╤═══════════════════╤═════════════════╗
║ Methods   │ Path          │ Name              │ Stack           ║
╟───────────┼───────────────┼───────────────────┼─────────────────╢
║ HEAD, GET │ /examples     │ Get all Examples  │ examplesHandler ║
╟───────────┼───────────────┼───────────────────┼─────────────────╢
║ POST      │ /examples     │ Create examples   │ examplesHandler ║
╟───────────┼───────────────┼───────────────────┼─────────────────╢
║ DELETE    │ /examples/:id │ Delete examples   │ examplesHandler ║
╟───────────┼───────────────┼───────────────────┼─────────────────╢
║ HEAD, GET │ /examples/:id │ Get example by id │ examplesHandler ║
╚═══════════╧═══════════════╧═══════════════════╧═════════════════╝`

      assert.equal(res.text, expectedValue)
      assert.equal(res.status, 200)
    })
  })

  describe('Raw mode', function () {
    it('Should return routes data in raw mode', async () => {
      const res = await superagent.get('http://localhost:9000/routes/map?raw=true')
      console.log(res.text)

      const expectedValue = `Methods | Path | Name | Stack
HEAD, GET | /examples | Get all Examples | examplesHandler
POST | /examples | Create examples | examplesHandler
DELETE | /examples/:id | Delete examples | examplesHandler
HEAD, GET | /examples/:id | Get example by id | examplesHandler`

      assert.equal(res.text, expectedValue)
      assert.equal(res.status, 200)
    })
  })
})

afterEach(() => {
  server.close()
})
