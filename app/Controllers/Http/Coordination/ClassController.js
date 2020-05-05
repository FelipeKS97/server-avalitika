'use strict'

const Discipline = use('App/Models/Discipline')
const Curriculum = use('App/Models/Curriculum')
const Class = use('App/Models/Class')
//const { isArrayNotEmpty, isArrayEmpty } = use('App/Helpers')

const Database = use('Database')

class ClassController {

  /**
   * Create/save a new set of classes.
   * POST classes/store
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeClasses ({ request, response }) {

    const trx = await Database.beginTransaction()

    let updatedClasses = []

    try {
      const { 
        period_id, 
        classes
      } = request.all()
      
      await Promise.all(classes.map(async c => {
        try {

          let foundClass = Class.query()
          
          foundClass
            .where('period_id', period_id)
            .andWhere('discipline_id', c.discipline_id)
            .andWhere('is_inactive', false)

          await foundClass.delete()

          await trx.commit()

        } catch(error) {

          await trx.rollback()
          return response.status(400).send({
            message: "Erro ao processar solicitação."
          })

        }
      }))

      let insertData = classes.map(c => {  
        return { ...c, period_id } 
      })

      let newClasses = await Class.createMany(insertData)

      return response.status(201).send(newClasses)

    } catch (error) {

      await trx.rollback()
      return response.status(400).send({
        message: "Erro ao processar solicitação."
      })
    }
  }

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
    const { page, limit } = pagination
    const cID = request.input('curriculum_id')
    const query = Discipline.query()
    
    query.where('curriculum_id', cID)
    
    let disciplines = await query.paginate(page, limit)
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
    const { page, limit } = pagination
    const cID = request.input('course_id')
    const query = Curriculum.query()
    
    query.where('course_id', cID)
    
    let curricula = await query.paginate(page, limit)
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
