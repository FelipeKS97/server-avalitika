'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')
const Course = use('App/Models/Course')
const Curriculum = use('App/Models/Curriculum')
const Discipline = use('App/Models/Discipline')
const Period = use('App/Models/Period')

class CourseSeeder {
  async run() {

    const courseId = 1
    const course = await Course.create({
        name: 'Sistemas de Informação',
        id: courseId
    })

    const curriculum1 = await Curriculum.create({
        name: 'BSI-2012',
        course_id: course.id
    })

    const curriculum2 = await Curriculum.create({
        name: 'BSI-2018',
        course_id: course.id
    })

    await Discipline.create({
        name: 'Administração e Projeto de Banco de Dados ',
        slug: 'APBD',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Administração e Projeto de Banco de Dados ',
        slug: 'APBD',
        curriculum_id: curriculum2.id
    })

    await Discipline.create({
        name: 'Arquitetura de Computadores ',
        slug: 'ARQC',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Arquitetura de Computadores ',
        slug: 'ARQC',
        curriculum_id: curriculum2.id
    })

    await Discipline.create({
        name: 'Sistemas Operacionais',
        slug: 'SOPE',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Sistemas Operacionais',
        slug: 'SOPE',
        curriculum_id: curriculum2.id
    })

    await Discipline.create({
        name: 'Governança em Tecnologia da Informação',
        slug: 'GOTI',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Governança em Tecnologia da Informação',
        slug: 'GOTI',
        curriculum_id: curriculum2.id
    })

    await Discipline.create({
        name: 'Interface Humano Computador',
        slug: 'INHC',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Interface Humano Computador',
        slug: 'INHC',
        curriculum_id: curriculum2.id
    })

    await Discipline.create({
      name: 'Marketing',
      slug: 'PRMK',
      curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Laboratório de Sistemas Operacionais de Redes',
        slug: 'LABSO',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
      name: 'Inteligência Artificial',
      slug: 'INAR',
      curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Tópicos Especiais em Sistemas de Informação 1',
        slug: 'TOSI1',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
        name: 'Tópicos Especiais em Sistemas de Informação 2',
        slug: 'TOSI2',
        curriculum_id: curriculum1.id
    })

    await Discipline.create({
      name: 'Empreendedorismo',
      slug: 'EMPR',
      curriculum_id: curriculum1.id
    })

    await Discipline.create({
      name: 'Fundamento de Redes de Computadores',
      slug: 'FNRD',
      curriculum_id: curriculum2.id
    })

    await Discipline.create({
      name: 'Introdução à Computação',
      slug: 'INCO',
      curriculum_id: curriculum2.id
    })

    await Discipline.create({
      name: 'Ética, Computador e Sociedade,',
      slug: 'ETCS',
      curriculum_id: curriculum1.id
    })

    await Discipline.create({
      name: 'Ética, Computador e Sociedade',
      slug: 'ETCS',
      curriculum_id: curriculum2.id
    })

    const period = await Period.create({
        description: '2020.1',
        status: true
    })

  }
}

module.exports = CourseSeeder
