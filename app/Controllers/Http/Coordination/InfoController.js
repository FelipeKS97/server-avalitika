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
  async getInfo({ response }) {
    const query = Period.query()
    query.where('status', 1)
    let period = await query.fetch()
    //period = await transform.paginate(period, Transformer)

    return response.send([...period.rows, { course_id: 1 }])
  }
}

module.exports = InfoController
