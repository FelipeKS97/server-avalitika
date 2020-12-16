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
    const professorRole = await Role.findBy('slug', 'professor')
    const coordinatorRole = await Role.findBy('slug', 'coordinator')
    const course = await Course.findBy('name', 'Sistemas de Informação')

    const prof1 = await User.create({
        name: "Fabrísia",
        fullname: "Fabrísia Ferreira de Araújo",
        email: 'fabrisia@ifal.edu.br' ,
        password: 'secret',
        id: uid
    })

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
        name: "Edison Camilo",
        fullname: "Edison Camilo de Moraes Junior",
        email: 'edison.camilo@ifal.edu.br',
        password: 'secret',
    })

    const prof3 = await User.create({
        name: "Eduardo Cardoso",
        fullname: "Eduardo Cardoso Moraes",
        email: 'eduardo.cardoso@ifal.edu.br',
        password: 'secret',
    })

    const prof4 = await User.create({
        name: "Yana Mendes",
        fullname: "Yana Mendes",
        email: 'yana.mendes@ifal.edu.br',
        password: 'secret',
    })

    const prof5 = await User.create({
        name: "Alexandre José",
        fullname: "Alexandre José Braga da Silva",
        email: 'alexandre.jose@ifal.edu.br',
        password: 'secret',
    })

    const prof6 = await User.create({
        name: "Ezequiel Batista",
        fullname: "Ezequiel Batista Farias",
        email: 'ezequiel.batista@ifal.edu.br',
        password: 'secret',
    })

    const prof7 = await User.create({
        name: "César Rodrigues",
        fullname: "César Rodrigues",
        email: 'cezar.rodrigues@ifal.edu.br',
        password: 'secret',
    })

    const prof8 = await User.create({
      name: "Bruno Ferreira",
      fullname: "Bruno Ferreira Barbosa Rocha",
      email: 'bruno.ferreira@ifal.edu.br',
      password: 'secret',
    })

    const prof9 = await User.create({
      name: "Ivo Calado",
      fullname: "Ivo Calado",
      email: 'ivo.calado@ifal.edu.br',
      password: 'secret',
    })

    const prof10 = await User.create({
      name: "Luiz Frederico",
      fullname: "Luiz Frederico Lopes Oliveira",
      email: 'luiz.frederico@ifal.edu.br',
      password: 'secret',
    })

    const prof11 = await User.create({
      name: "Tárcio Rodrigues",
      fullname: "Tárcio Rodrigues Bezerra",
      email: 'tarcio.rodrigues@ifal.edu.br',
      password: 'secret',
    })

    const prof12 = await User.create({
      name: "Augusto Oliveira",
      fullname: "Augusto Oliveira",
      email: 'augusto.oliveira@ifal.edu.br',
      password: 'secret',
    })

    const prof13 = await User.create({
      name: "Mônica Ximenes",
      fullname: "Mônica Ximenes",
      email: 'monica@ifal.edu.br',
      password: 'secret',
    })

    const prof14 = await User.create({
      name: "Breno da Costa",
      fullname: "Breno da Costa",
      email: 'breno.costa@ifal.edu.br',
      password: 'secret',
    })

    const prof15 = await User.create({
      name: "Leonardo Medeiros",
      fullname: "Leonardo Medeiros",
      email: 'leonardo.medeiros@ifal.edu.br',
      password: 'secret',
    })

    const prof16 = await User.create({
      name: "Anderson Gomes",
      fullname: "Anderson Gomes",
      email: 'anderson.gomes@ifal.edu.br',
      password: 'secret',
    })

    await prof2.roles().attach([professorRole.id])
    await prof3.roles().attach([professorRole.id])
    await prof4.roles().attach([professorRole.id])
    await prof5.roles().attach([professorRole.id])
    await prof6.roles().attach([professorRole.id])
    await prof7.roles().attach([professorRole.id])
    await prof8.roles().attach([professorRole.id])
    await prof9.roles().attach([professorRole.id])
    await prof10.roles().attach([professorRole.id])
    await prof11.roles().attach([professorRole.id])
    await prof12.roles().attach([professorRole.id])
    await prof13.roles().attach([professorRole.id])
    await prof14.roles().attach([professorRole.id])
    await prof15.roles().attach([professorRole.id])
    await prof16.roles().attach([professorRole.id])


    const professor2 = await Professor.create({
        user_id: prof2.id
    })
    const professor3 = await Professor.create({
        user_id: prof3.id
    })
    const professor4 = await Professor.create({
        user_id: prof4.id
    })
    const professor5 = await Professor.create({
        user_id: prof5.id
    })
    const professor6 = await Professor.create({
        user_id: prof6.id
    })
    const professor7 = await Professor.create({
        user_id: prof7.id
    })
    const professor8 = await Professor.create({
        user_id: prof8.id
    })
    const professor9 = await Professor.create({
        user_id: prof9.id
    })
    const professor10 = await Professor.create({
        user_id: prof10.id
    })
    const professor11 = await Professor.create({
        user_id: prof11.id
    })
    const professor12 = await Professor.create({
        user_id: prof12.id
    })
    const professor13 = await Professor.create({
        user_id: prof13.id
    })
    const professor14 = await Professor.create({
        user_id: prof14.id
    })
    const professor15 = await Professor.create({
        user_id: prof15.id
    })
  }
}

module.exports = UserSeeder
