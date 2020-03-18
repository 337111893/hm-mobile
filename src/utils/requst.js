import axios from 'axios'
// axios.defaults 是对原有默认值进行修改

// axios.create() // 相当于 new 了一个新的axios实例

const instance = axios.create({

  //  构造参数 传入一些配置 和defaults一样
})// 创建一个axios的新实例

export default instance
