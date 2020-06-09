/**
 * @description sequelize 同步数据路
 */

const seq = require('./seq')
require('../app/models/user')
require('../app/models/goods')
require('../app/models/collect')
// 测试链接
seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
})

// 执行同步 force: 清空表
seq.sync({force: true}).then(()=>{
    console.log('sync ok')
    process.exit()
})