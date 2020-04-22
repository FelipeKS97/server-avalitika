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


    const discipline1 = await Discipline.create({
        name: 'Programação Orientada a Objetos',
        slug: 'PROO',
        curriculum_id: curriculum1.id
    })

    const discipline2 = await Discipline.create({
        name: 'Algoritmos',
        slug: 'ALGO',
        curriculum_id: curriculum1.id
    })

    const discipline3 = await Discipline.create({
        name: 'Fundamentos de Programação',
        slug: 'FPRO',
        curriculum_id: curriculum2.id
    })

    const discipline4 = await Discipline.create({
        name: 'Matemática Básica',
        slug: 'MATB',
        curriculum_id: curriculum2.id
    })
    
    const period = await Period.create({
        description: '2020.1',
        status: true
    })

  }
}

module.exports = CourseSeeder