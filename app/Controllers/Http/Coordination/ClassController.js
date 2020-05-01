'use strict'

const Discipline = use('App/Models/Discipline')
const Curriculum = use('App/Models/Curriculum')
// const Professor = use('App/Models/Professor')
// const User = use('App/Models/User')

const Database = use('Database')

class ClassController {

    /**
   * Show a list of all disciplines.
   * GET disciplines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async listDisciplines({ request, response, pagination }) {
    //const { page, limit } = pagination
    const cID = request.input('curriculum_id')
    const query = Discipline.query()
    
    query.where('curriculum_id', cID)
    
    let disciplines = await query.fetch() //.paginate(page, limit)
    //disciplines = await transform.paginate(disciplines, Transformer)
    
    return response.send(disciplines)
  }

  /**
   * Show a list of all curriculum.
   * GET curricula
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */

  async listCurricula({ request, response, pagination }) {
   // const { page, limit } = pagination
    const cID = request.input('course_id')
    const query = Curriculum.query()
    
    query.where('course_id', cID)
    
    let curricula = await query.fetch() //.paginate(page, limit)
    //curricula = await transform.paginate(curricula, Transformer)
    
    return response.send(curricula)
  }

  async listProfessors ({ request, response, pagination }) {

    // const { page, limit } = pagination

    const fullname = request.input('fullname')

    let results = await Database
      .select('*')
      .from('users')
      .where('fullname', 'LIKE', `%${fullname}%`)
      .leftJoin('professors', 'users.id', 'professors.user_id')

    return response.send(results)
  }



}

module.exports = ClassController
