'use strict'

const Period = use('App/Models/Period')

class InfoController {

    /**
   * Show a list of all coordination informations.
   * GET info
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param { Object } ctx.pagination
   */
  async index({ response }) {
    // const { page, limit } = pagination
    const query = Period.query()
    
    query.where('status', 1)

    const period = await query.fetch()

    return response.send(period)
  }
}

module.exports = InfoController
