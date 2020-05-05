'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Formulary = use('App/Models/Formulary')
const Answer = use('App/Models/Answer')

/**
 * Resourceful controller for interacting with forms
 */
class FormController {
  /**
   * Show a list of all forms.
   * GET forms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ request, response, pagination }) {
    const { page, limit } = pagination

    const { period_id, curriculum_id } = request.all()
    
    const query = Formulary.query()

    if(period_id && curriculum_id) {
      query
        .where('period_id', period_id)
        .where('curriculum_id', curriculum_id)
    }
    
    let formularies = await query.paginate(page, limit)
    //formularies = await transform.paginate(formularies, Transformer)

    return response.send(formularies)
  }

  /**
   * Create/save a new form.
   * POST forms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { 
        period_id, 
        curriculum_id, 
        title, 
        is_general_form, 
        json_format
      } = request.all()

      let published_at = null
      const published_until = null
      const format = JSON.stringify(json_format)

      // if(status) {
      //   published_at = new Date.getTime()
      // }

      let formulary = await Formulary.create({ 
        period_id, 
        curriculum_id, 
        title, 
        is_general_form, 
        json_format: format,
        published_at,
        published_until
      })
      //formulary = await transform.item(formulary, Transformer)
      return response.status(201).send(formulary)

    } catch (error) {

      console.log(error)

      return response.status(400).send({
        message: "Erro ao processar solicitação."
      })
    }
  }


    /**
   * Display a single form.
   * GET forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TranformWith} ctx.transform
   */
  async show ({ params: { id },  response }) {
    let formulary = await Formulary.findOrFail(id)
   // formulary = await transform.item(formulary, Transformer)
    return response.send(formulary)
  }


  /**
   * Update form details.
   * PUT or PATCH forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    let formulary = await Formulary.findOrFail(id)

    if(formulary.published_at || formulary.status === 1) {
      return response.status(400).send({
        message: "Erro ao processar solicitação: Formulário já foi publicado."
      })
    } else {

      try {
        const { 
          curriculum_id, 
          title, 
          is_general_form, 
          status,
          json_format
        } = request.all()

        const format = JSON.stringify(json_format)

        formulary.merge({ 
          curriculum_id, 
          title, 
          is_general_form, 
          status,
          json_format: format
        })

        await formulary.save()
        // formulary = await transform.item(formulary, Transformer)
        
        return response.send(formulary)
        
      } catch (error) {
        
        return response.status(400).send({
          message: "Erro ao processar solicitação."
        })    
      }
    }
  }

  /**
   * Delete a form with id.
   * DELETE forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    
    const formulary = await Formulary.findOrFail(id)

    if(formulary.status === 1 || formulary.published_at) {
      return response.status(400).send({
        message: "Erro ao processar solicitação: Formulário já foi publicado."
      })
    } else {
      
      try {
        await formulary.delete()
        return response.status(204).send()
        
      } catch(error) {
        
        return response.status(500).send({
          message: "Erro ao processar solicitação."
        })  
      }
    }
  }


  /**
   * Update form publish date.
   * PUT or PATCH forms/:id/publish
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async publishForm ({ params: { id }, response }) {
    let formulary = await Formulary.findOrFail(id)

    if(formulary.status === 1) {
      return response.status(400).send({
        message: "Erro ao processar solicitação: Formulário já foi publicado."
      })
    } else {

      try {

        const published_at = new Date().getTime()

        formulary.merge({ 
          published_at, 
          published_until: null, 
          status: true 
        })

        await formulary.save()
        // formulary = await transform.item(formulary, Transformer)

        return response.send(formulary)
      } catch (error) {

        console.log(error)
        
        return response.status(400).send({
          message: "Erro ao processar solicitação."
        })    
      }
    }
  }


  /**
   * Update form unpublish date.
   * PUT or PATCH forms/:id/unpublish
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async unpublishForm ({ params: { id }, response }) {
    let formulary = await Formulary.findOrFail(id)

    if(formulary.status === 0) {
      return response.status(400).send({
        message: "Erro ao processar solicitação: Retirada da publicação do formulário já foi feita."
      })
    } else {

      try {

        const published_until = new Date().getTime()
        formulary.merge({ published_until, status: false })

        await formulary.save()
        // formulary = await transform.item(formulary, Transformer)

        return response.send(formulary)
      } catch (error) {
        
        return response.status(400).send({
          message: "Erro ao processar solicitação."
        })    
      }
    }
  }


   /**
   * Show a list of all formulary answers.
   * GET formulary/:id/answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */

  async listAnswers ({ request, response, pagination }) {
    const { page, limit } = pagination
    const { formulary_id } = request.all()
    const query = Answer.query()

    if(formulary_id) {
      query.where('formulary_id', formulary_id)
    }
    let answers = await query.paginate(page, limit)
   
    return response.send(answers)
  }


    /**
   * Display a single form answer.
   * GET formulary/answer/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TranformWith} ctx.transform
   */
  async showAnswer ({ params: { id },  response }) {
    let answer = await Answer.findOrFail(id)
   // answer = await transform.item(formulary, Transformer)
    return response.send(answer)
  }
}

module.exports = FormController
