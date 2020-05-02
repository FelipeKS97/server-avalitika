'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // Rotas Gerais
  Route.get('disciplines', 'ClassController.listDisciplines').as('disciplines')
  Route.get('curricula', 'ClassController.listCurricula').as('curricula')
  Route.get('professors', 'ClassController.listProfessors').as('professors')
  Route.get('info', 'InfoController.getInfo').as('info')
  
  // SubRotas de formulário
  Route.resource('formulary', 'FormController').apiOnly()
  Route.put('formulary/:id/publish', 'FormController.publishForm')
  Route.put('formulary/:id/unpublish', 'FormController.unpublishForm')
  
})
  .prefix('v1/coord')
  .namespace('Coordination')
