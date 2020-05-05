'use strict'

const crypto = use('crypto')

const Helpers = use('Helpers')


/**
 * Generate random strings
 * 
 * @param { int } length The lenght for the randomic string(by default: 40)
 * @return { string } the generated string
 */
const str_random = async (length = 40) => {
    let string = ''
    let len = string.length
  
    if (len < length) {
      let size = length - len
      let bytes = await crypto.randomBytes(size)
      let buffer = Buffer.from(bytes)
      string += buffer
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substr(0, size)
    }
    return string
}

const isArrayNotEmpty = async (array) => {
  if(Array.isArray(array) && array.length > 0) return true
}

const isArrayEmpty = async (array) => {
  if(Array.isArray(array) && array.length < 1) return true
}


module.exports = {
    str_random,
    isArrayNotEmpty,
    isArrayEmpty
}