'use strict'

const Course = use('App/Models/Course')
const Curriculum = use('App/Models/Curriculum')
const Class = use('App/Models/Class')
const Formulary = use('App/Models/Formulary')
const Answer = use('App/Models/Answer')
const Discipline = use('App/Models/Discipline')
const Database = use('Database')

class StudentController {

    /**
   * Show a list of courses.
   * GET courses
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async listCourses({ response, pagination }) {
    const { page, limit } = pagination
    const query = Course.query()

    let courses = await query.paginate(page, limit)
    //courses = await transform.paginate(courses, Transformer)

    return response.send(courses)
  }

    /**
   * Show a list of curricula.
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


   /**
   * Show a list of formularies.
   * GET formularies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async listFormularies({ request, response, pagination }) {
    const { page, limit } = pagination
    const cID = request.input('curriculum_id')
    const query = Formulary.query()
    
    query.where('curriculum_id', cID)
        .andWhere('status', true)
    
    let formularies = await query.paginate(page, limit)
    //formularies = await transform.paginate(formularies, Transformer)
    
    return response.send(formularies)
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
   * Show a list of all available classes.
   * GET profClasses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */

  async listClasses({ request, response, pagination }) {
    const { page, limit } = pagination
    const { 
        discipline_id, 
        period_id
      } = request.all()
    const classQuery = Class.query()
    
    classQuery.where('discipline_id', discipline_id)
        .andWhere('period_id', period_id)
        .andWhere('is_inactive', false)
    
    let classes = await classQuery.paginate(page, limit)
    //classes = await transform.paginate(classes, Transformer)
    return response.send(classes)
  }

    /**
   * Display a single formulary.
   * GET formulary/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TranformWith} ctx.transform
   */
  async getForm({ params: { id },  response }) {
    let formulary = await Formulary.findOrFail(id)
    if(formulary.status) {
        return response.send(formulary)
    } else {
        return response.status(404).send({
            message: "Erro ao processar solicitação: Não há publicação de formulário."
        })
    }
  }


  /**
   * Create/save a new form answer.
   * POST answer
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async postAnswer ({ request, response }) {
    try {
      const { 
        period_id, 
        discipline_id, 
        formulary_id, 
        professor_id,
        verification_id, 
        json_answer
      } = request.all()

      
    //   let results = await Database
    //     .select('*')
    //     .from('answers')
    //     .where('verification_id', verification_id)
    //     .where('formulary', formulary)
    //     .where('period_id', period_id)
    //     .where('discipline_id', discipline_id)
    //     .where('professor_id', professor_id)

    //   if(Array.isArray(results) && results.length > 0) {

    //   }

      const format = JSON.stringify(json_answer)

      let answer = await Answer.create({ 
        period_id, 
        discipline_id, 
        formulary_id, 
        professor_id,
        verification_id, 
        json_answer: format,
      })
      //answer = await transform.item(answer, Transformer)
      return response.status(201).send(answer)

    } catch (error) {

      return response.status(400).send({
        message: "Erro ao processar solicitação."
      })
    }
  }


}

module.exports = StudentController
