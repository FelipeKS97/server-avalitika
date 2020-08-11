'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ClassTransformer = use('App/Transformers/Coordination/ClassTransformer')
const FormTransformer = use('App/Transformers/Coordination/FormTransformer')

/**
 * Answer Transformer class
 *
 * @class Answer Transformer
 * @constructor
 */
class AnswerTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get defaultInclude() {
    return ['class']
  }
  static get availableInclude() {
    return ['formulary']
  }

  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     json_answer: model.json_answer,
     created_at: model.created_at,
    }
  }

  includeClass(model) {
    return this.item(model.getRelated('class'), ClassTransformer)
  }

  includeFormulary(model) {
    return this.item(model.getRelated('formulary'), FormTransformer)
  }
  
}

module.exports = AnswerTransformer
