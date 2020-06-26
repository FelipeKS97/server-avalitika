'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * Discipline Transformer class
 *
 * @class Discipline Transformer
 * @constructor
 */
class DisciplineTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     name: model.name
    }
  }
}

module.exports = DisciplineTransformer
