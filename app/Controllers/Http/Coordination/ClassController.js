'use strict'

const Discipline = use('App/Models/Discipline')
const Curriculum = use('App/Models/Curriculum')
const Class = use('App/Models/Class')
//const { isArrayNotEmpty, isArrayEmpty } = use('App/Helpers')

const Database = use('Database')

class ClassController {

  /**
   * Create/save a new set of classes.
   * POST classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeClasses ({ request, response }) {

    const trx = await Database.beginTransaction()

    try {
      const { 
        period_id, 
        classes,
        disc_array
      } = request.all()

      if(classes.length < 1 && disc_array) {
        // console.log('vc mandou um array vazio, quer que eu exclua tudo?')
        await Promise.all(disc_array.map(async d => {
          try {
            let foundClass = Class.query()
            foundClass
              .where('period_id', period_id)
              .andWhere('discipline_id', d)
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
        return response.send([])
      } else {
      
      await Promise.all(disc_array.map(async c => {
        try {

          let foundClass = Class.query()
          
          foundClass
            .where('period_id', period_id)
            .andWhere('discipline_id', c)
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
        let unifiedID = `${period_id}${c.discipline_id}${c.professor_id}`
        console.log(unifiedID)  
        return { ...c, period_id, id: unifiedID }
      })
      let newClasses = await Class.createMany(insertData)

      return response.status(201).send(newClasses)
    }

    } catch (error) {

      await trx.rollback()
      return response.status(400).send({
        message: "Erro ao processar solicitação."
      })
    }
  }

  /**
   * Show a list of all disciplines.
   * GET classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async getClasses({ request, response, pagination }) {
    const { page, limit } = pagination
    const { 
      disc_array, 
      period_id
    } = request.all()
        
    let results = await Database
      .from('classes')
      .whereIn('discipline_id', disc_array)
      .andWhere('period_id', period_id)
      .andWhere('is_inactive', false)
      
    return response.send(results)
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
    const { page, limit } = pagination
    const cID = request.input('course_id')
    const query = Curriculum.query()
    
    query.where('course_id', cID)
    
    let curricula = await query.fetch() //.paginate(page, limit)
    //curricula = await transform.paginate(curricula, Transformer)
    
    return response.send(curricula)
  }

  async listProfessors ({ request, response, pagination }) {
    // const { page, limit } = pagination
    let results
    const fullname = request.input('fullname')
    if(fullname) {
      results = await Database
      .select('user_id', 'name', 'fullname', 'email')
      .from('users')
      .where('fullname', 'LIKE', `%${fullname}%`)
      .leftJoin('professors', 'users.id', 'professors.user_id')
    } else {
      results = await Database
      .select('user_id', 'name', 'fullname', 'email')
      .from('users')
      .leftJoin('professors', 'users.id', 'professors.user_id')
    }
    return response.send(results)
  }
}

module.exports = ClassController
