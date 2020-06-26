'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * Curriculum Transformer class
 *
 * @class Curriculum Transformer
 * @constructor
 */
class CurriculumTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     name: model.name,
     course_id: model.course_id
    }
  }
}

module.exports = CurriculumTransformer
