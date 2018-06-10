'use strict'

const chalk = require('chalk')
const { table } = require('table')

function displayRoutes(router, options) {
  const chk = new chalk.constructor({enabled: options.color})
  const result = router.stack.reduce((tableData, route) => {
    if (route.methods.length === 0) {
      route.methods.push('*')
    }

    const stack = route.stack.map(f => f.name ? f.name : chk.red('Unamed')).join(', ')

    tableData.push([chk.green(route.methods.join(', ')), chk.cyan(route.path),  chk.white(route.name ? route.name : ''), stack])

    return tableData
  }, [
    [chk.yellow('Methods'), chk.yellow('Path'), chk.yellow('Name'), chk.yellow('Stack')]
  ])

  return  options.raw ? result.map(line => line.join(' | ')).join('\n') : table(result)
}

function handlerFactory(router) {
  return async (ctx, next) => {
    if (ctx.path === '/routes/map') {
      const options = {
        color: ctx.request.query.color === 'true',
        raw: ctx.request.query.raw === 'true',
      }
      ctx.body = displayRoutes(router, options)
      ctx.status = 200
    } else  {
      await next()
    }
  }
}

module.exports = handlerFactory
