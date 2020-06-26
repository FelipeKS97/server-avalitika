'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const PeriodTransformer = use('App/Transformers/Coordination/PeriodTransformer')
const DisciplineTransformer = use('App/Transformers/Coordination/DisciplineTransformer')
const ProfessorTransformer = use('App/Transformers/Coordination/ProfessorTransformer')

/**
 * Class Transformer class
 *
 * @class Class Transformer
 * @constructor
 */
class ClassTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get defaultInclude() {
    return ['period', 'discipline', 'professor']
  }

  transform (model) {
    return {
     // add your transformation object here
     is_inactive: model.is_inactive,
     prof_name: model.prof_name
    }
  }

  includePeriod(model) {
    return this.item(model.getRelated('period'), PeriodTransformer)
  }
  
  includeDiscipline(model) {
    return this.item(model.getRelated('discipline'), DisciplineTransformer)
  }

  includeProfessor(model) {
    return this.item(model.getRelated('professor'), ProfessorTransformer)
  }
}

module.exports = ClassTransformer
