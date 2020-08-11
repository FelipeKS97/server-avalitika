'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // Rota Temporária
  Route.get('info', 'InfoController.getInfo').as('info.info')

  // Rotas Gerais
  Route.get('disciplines', 'ClassController.listDisciplines').as('class.listDisciplines')
  Route.get('curricula', 'ClassController.listCurricula').as('class.listCurricula')
  Route.get('professors', 'ClassController.listProfessors').as('class.listProfessors')
  Route.get('dashboard', 'DashboardController.answersSummary').as('dashboard.answersSummary')

  // SubRotas de Turmas
  Route.get('classes', 'ClassController.getClasses').as('class.getClasses')
  Route.post('classes', 'ClassController.storeClasses').as('class.storeClasses')
  
  // SubRotas de Formulário
  Route.resource('formulary', 'FormController').apiOnly()
  Route.put('formulary/:id/publish', 'FormController.publish').as('formulary.publish')
  Route.put('formulary/:id/unpublish', 'FormController.unpublish').as('formulary.unpublish')
  Route.get('formulary/:id/answers', 'FormController.listAnswers').as('formulary.listAnswers')
  Route.get('formulary/answer/:id', 'FormController.showAnswer').as('formulary.showAnswer')
})
  .prefix('v1/coord')
  .namespace('Coordination')