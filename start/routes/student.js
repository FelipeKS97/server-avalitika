'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // Rotas Gerais de Listagem
  Route.get('courses', 'AnswerController.listCourses').as('answer.listCourses')
  Route.get('curricula', 'AnswerController.listCurricula').as('answer.listCurricula')
  Route.get('formularies', 'AnswerController.listFormularies').as('answer.listFormularies')
 
  Route.get('disciplines', 'AnswerController.listDisciplines').as('answer.listDisciplines')
  Route.get('classes', 'AnswerController.listClasses').as('answer.listClasses')
 
 // SubRotas de Formulário
  Route.get('formulary/:id', 'AnswerController.getForm').as('answer.formulary.getForm')
  Route.post('formulary', 'AnswerController.postAnswer').as('answer.formulary.postAnswer')
    
})
  .prefix('v1/student')
  .namespace('Student')