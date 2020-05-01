'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('disciplines', 'ClassController.listDisciplines').as('disciplines')
  Route.get('curricula', 'ClassController.listCurricula').as('curricula')
  Route.get('professors', 'ClassController.listProfessors').as('professors')
  Route.get('info', 'InfoController.index').as('info')
  
})
  .prefix('v1/coord')
  .namespace('Coordination')
