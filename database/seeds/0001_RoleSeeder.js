'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')
class RoleSeeder {
  async run() {
    // Cria o admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema.'
    })
    // cria o cargo de gerente
    await Role.create({
      name: 'Coordenador',
      slug: 'coordinator',
      description: 'Coordenador de curso.'
    })
    // cria o cargo de cliente
    await Role.create({
      name: 'Professor',
      slug: 'professor',
      description: 'Professor de curso.'
    })
  }
}

module.exports = RoleSeeder