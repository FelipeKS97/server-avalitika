'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Formulary = use('App/Models/Formulary')
const Period = use('App/Models/Period')

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
   // formularies = await transform.paginate(formularies, Transformer)

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
  }

  /**
   * Display a single form.
   * GET forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Update form details.
   * PUT or PATCH forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a form with id.
   * DELETE forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FormController
