'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// Route.get('v1/me', 'UserController.me')
//   .as('me')

/**
 * Importa as rotas do usuário Coordenador
 */
require('./coordination')

/**
 * Importa as rotas de acesso do Estudante
 */
require('./student')

/**
 * Importa as rotas para lidar com autenticação
 */
require('./auth')
