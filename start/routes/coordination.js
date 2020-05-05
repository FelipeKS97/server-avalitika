'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // Rotas Gerais
  Route.get('classes', 'ClassController.getClasses').as('classes.index')
  Route.post('classes', 'ClassController.storeClasses').as('classes.store')
  Route.get('disciplines', 'ClassController.listDisciplines').as('disciplines')
  Route.get('curricula', 'ClassController.listCurricula').as('curricula')
  Route.get('professors', 'ClassController.listProfessors').as('professors')
  Route.get('info', 'InfoController.getInfo').as('info')
  
  // SubRotas de formulário
  Route.resource('formulary', 'FormController').apiOnly()
  Route.put('formulary/:id/publish', 'FormController.publishForm').as('formulary.publish')
  Route.put('formulary/:id/unpublish', 'FormController.unpublishForm').as('formulary.unpublish')
  Route.get('formulary/:id/answers', 'FormController.listAnswers').as('formulary.listAnswers')
  Route.get('formulary/answer/:id', 'FormController.showAnswer').as('formulary.showAnswer')
})
  .prefix('v1/coord')
  .namespace('Coordination')