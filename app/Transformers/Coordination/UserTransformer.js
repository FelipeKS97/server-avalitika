'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * User Transformer class
 *
 * @class User Transformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     username: model.username,
     fullname: model.fullname
    }
  }
}

module.exports = UserTransformer
