/**
 * @description 校验器
 */

 const {LinValidator, Rule} = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule('isInt', '需要正整数')
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}