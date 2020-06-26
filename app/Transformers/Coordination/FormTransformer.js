'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const PeriodTransformer = use('App/Transformers/Coordination/PeriodTransformer')
const CurriculumTransformer = use('App/Transformers/Coordination/CurriculumTransformer')

/**
 * FormTransformer class
 *
 * @class FormTransformer
 * @constructor
 */
class FormTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get defaultInclude() {
    return ['period', 'curriculum']
  }

  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     title: model.title,
     json_format: model.json_format,
     is_general_form: model.is_general_form,
     status: model.status,
     published_at: model.published_at,
     published_until: model.published_until
    }
  }

  includePeriod(model) {
    return this.item(model.getRelated('period'), PeriodTransformer)
  }

  includeCurriculum(model) {
    return this.item(model.getRelated('curriculum'), CurriculumTransformer)
  }
}

module.exports = FormTransformer
