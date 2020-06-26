'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const UserTransformer = use('App/Transformers/Coordination/UserTransformer')

/**
 * Professor Transformer class
 *
 * @class Professor Transformer
 * @constructor
 */
class ProfessorTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get defaultInclude() {
    return ['user']
  }

  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     user_id: model.user_id
    }
  }

  includeUser(model) {
    return this.item(model.getRelated('user'), UserTransformer)
  }
}

module.exports = ProfessorTransformer
