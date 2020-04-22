'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    // Route.get('disciplines/:id', 'DisciplineController.findDiscipline')    
  
})
  .prefix('v1/coord')
  .namespace('Coordinator')
