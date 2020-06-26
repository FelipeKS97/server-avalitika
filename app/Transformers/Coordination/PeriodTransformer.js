'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * PeriodTransformer class
 *
 * @class PeriodTransformer
 * @constructor
 */
class PeriodTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     description: model.description,
     status: model.status
    }
  }
}

module.exports = PeriodTransformer
