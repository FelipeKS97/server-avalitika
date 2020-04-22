'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')
const Course = use('App/Models/Course')
const Coordinator = use('App/Models/Coordinator')
const Professor = use('App/Models/Professor')
const Period = use('App/Models/Period')

class UserSeeder {
  async run() {

    const uid = 1

    const prof1 = await User.create({
        name: "Ciclano",
        fullname: "Ciclano dos Santos Menezes",
        email: 'ciclano@ifal.edu.br' ,
        password: 'secret',
        id: uid
    })

    const professorRole = await Role.findBy('slug', 'professor')
    const coordinatorRole = await Role.findBy('slug', 'coordinator')
    const course = await Course.findBy('name', 'Sistemas de Informação')

    await prof1.roles().attach([coordinatorRole.id, professorRole.id])

    const professor1 = await Professor.create({
        id: 1,
        user_id: uid
    })

    const coordinator = await Coordinator.create({
        professor_id: 1,
        course_id:  course.id,
    })

    const prof2 = await User.create({
        name: "Beltrano",
        fullname: "Beltrano de Melo Monteiro",
        email: 'beltrano@ifal.edu.br',
        password: 'secret',
    })

    const prof3 = await User.create({
        name: "Fulano",
        fullname: "Fulano de Tal da Silva",
        email: 'fulano@ifal.edu.br',
        password: 'secret',
    })

    await prof2.roles().attach([professorRole.id])
    await prof3.roles().attach([professorRole.id])


    const professor2 = await Professor.create({
        user_id: prof2.id
    })
    const professor3 = await Professor.create({
        user_id: prof3.id
    })

  }
}

module.exports = UserSeeder