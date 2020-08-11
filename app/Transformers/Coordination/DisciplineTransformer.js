'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const CurriculumTransformer = use('App/Transformers/Coordination/CurriculumTransformer')

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
  static get defaultInclude() {
    return ['curriculum']
  }

  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     name: model.name
    }
  }

  includeCurriculum(model) {
    return this.item(model.getRelated('curriculum'), CurriculumTransformer)
  }
}

module.exports = DisciplineTransformer
