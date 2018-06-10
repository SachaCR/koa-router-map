'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const koaRouterMap = require('../')

const router = new Router()

router.get('Get all Examples', '/examples', async function getAllExamples(ctx) {
    ctx.body = 'OK'
})

router.post('Create examples', '/examples', async function createExample(ctx) {
    ctx.body = 'OK'
})

router.delete('Delete examples', '/examples/:id', async function deleteExampleById(ctx) {
    ctx.body = 'OK'
})

router.get('Get example by id', '/examples/:id', async function getExampleById(ctx) {
    ctx.body = 'OK'
})

const app = new Koa()
app.use(koaRouterMap(router))
app.use(router.routes(), router.allowedMethods())
module.exports = app
