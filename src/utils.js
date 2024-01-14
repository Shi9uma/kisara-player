
import fs from 'fs'
import yaml from 'js-yaml'
import https from 'https'
import moment from 'moment'
import winston from 'winston'

import { URL } from 'url'
import { basename, dirname } from "node:path"
import { fileURLToPath } from "node:url"

class utils {
    constructor() {
        this.__dirname = dirname(fileURLToPath(import.meta.url))
        this.dir_name = basename(dirname(this.__dirname))

        this.user_config_default_dir = `./config/default`
        this.user_config_dir = `./config`
    }

    /**
     * 初始化
     */
    init() {
        return
    }

    /**
     * 日志系统
     * @param {*} msg 打印信息
     * @param {*} level 日志级别：info, warn, error
     * @param {*} output 默认输出到控制台，也可以输出到文件：console, file
     * @param {*} log_path 在指定了 output 后，填写日志输出路径，默认 ./log.log
     * ```js
     * let logger = utils.logger
     * logger('test')  // 默认 info 级别，输出到控制台
     * logger('test', 'warn')  // 输出 warn 级别，输出到控制台
     * logger('test', 'warn', 'file')  // 输出 warn 级别，输出到文件
     * logger('test', 'error', 'file', './log/test.log')  // 输出 error 级别，输出到文件 test.log
     * ```
     */
    logger(msg, level = 'info', output = 'console', log_path = 'log.log') {

        // 配置日志传输器
        let logger = winston.createLogger({
            level: level, // 设置日志级别
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ), // 设置日志格式
            transports: [
                output == 'console' ? new winston.transports.Console() : new winston.transports.File({ filename: log_path })    // 输出到控制台 or 文件
            ]
        });

        switch (level) {
            case 'info':
                logger.info(msg); break;
            case 'warn':
                logger.warn(msg); break;
            case 'error':
                logger.error(msg); break;
            default:
                logger.error('没有指定 logger level'); break;
        }
    }

    /**
     * 异步实现秒暂停, 需要 await
     * @param {*} time 秒
     * 
     * ```js
     * await utils.wait(1)  // 暂停 1 秒
     * ```
     */
    wait(time) {
        new Promise(resolve => setTimeout(() => resolve(), time * 1000))
    }

    /**
    * 判断文件夹是否有效
    * @param {string} dir_path 文件夹路径
    * @returns 文件夹是否存在
    */
    is_dir_valid(dir_path) {
        return fs.existsSync(dir_path)
    }

    /**
     * 判断文件是否有效
     * @param {*} file_name 文件路径
     * @returns 文件是否存在
     */
    is_file_valid(file_name) {
        return fs.existsSync(file_name)
    }

    /**
     * 创建文件夹
     * @param {*} dir_path 文件夹路径
     */
    make_dir(dir_path) {
        fs.mkdir(dir_path, (err) => { if (err) this.logger(err, 'error') })
    }

    /**
     * 递归地创建文件夹
     * @param {*} dir_path 文件夹路径
     */
    make_full_dir(dir_path) {
        fs.mkdirSync(dir_path, { recursive: true })
    }

    /**
     * 创建文件
     * @param {*} file_path 目标路径
     */
    touch_file(file_path, data = '') {
        fs.writeFile(file_path, data, (err) => { if (err) this.logger(err, 'error') })
    }

    /**
     * 删除指定文件
     * @param {*} file_path 要删除文件的路径
     */
    delete_file(file_path) {
        fs.unlink(file_path, (err) => { if (err) this.logger(err, 'error') })
    }

    /**
     * 读取 yaml 文件
     * @param {string} file_path 要读取的文件路径
     * @param {string} encoding 读取格式, 默认 utf8
     * @returns 返回读取的信息，若出错则返回 logger 内容
     */
    read_yaml_file(file_path, encoding = 'utf8') {
        if (!(type == 'config' || type == 'default')) {
            return this.logger('读取配置文件出错', 'error')
        }
        if (this.is_file_valid(file_path)) {
            return yaml.load(fs.read_fileSync(file_path, encoding))
        } else {
            return this.logger(`找不到 ${file_path} 文件`, 'error')
        }
    }

    /**
     * 读取文件内容
     * @param {*} file_path 
     * @returns 
     */
    read_file(file_path) {
        if (!this.is_file_valid(file_path))
            return this.logger(`目标文件 ${file_path} 不存在或不合法`, 'error')
        return fs.read_fileSync(file_path, 'utf8')
    }

    /**
     * 将数据写入到目标文件
     * @param {*} file_path 目标文件路径, 若不存在将直接创建
     * @param {*} data 要写入的数据
     * @returns 
     */
    write_file(file_path, data) {
        if (!this.is_file_valid(file_path))
            this.touch_file(file_path)
        return fs.writeFileSync(file_path, data, 'utf8')
    }

    /**
     * 返回 json 文件数据
     * @param {*} file_path 
     * @returns 
     */
    read_json_file(file_path) {
        return JSON.parse(this.read_file(file_path))
    }

    /**
     * 写入 json 文件
     * @param {string} file_path json 文件路径
     * @param {*} data 要写入的 json 数据
     * @param {number} tab json 文件默认缩进
     */
    write_json_file(file_path, data, tab = 4) {
        if (!this.is_file_valid(file_path)) {
            this.logger(`文件路径：${file_path} 非法`, 'error')
            return
        }
        fs.writeFile(file_path, JSON.stringify(data, null, tab), (err) => {
            if (err) this.logger(err, 'error')
        })
    }

    /**
     * 通过 url 获取图像并保存
     * @param {*} img_url 图像 url
     * @param {*} img_name 要保存成的图像名字, 无后缀
     * @param {*} save_dir_path 图像保存文件夹路径
     * @param {string} img_type 图像保存的类型(后缀名)
     * @param {*} headers 传入 { 'Referer': 'xxx', ...}
     * @param {*} method GET or POST
     */
    save_url_img(img_url, img_name, save_dir_path, img_type = 'png', headers = {}, method = 'GET') {
        let urlObject = new URL(img_url)
        let httpsOptions = {
            hostname: urlObject.hostname,
            path: urlObject.pathname,
            headers: headers,
            method: method
        }
        https.request(httpsOptions, (res) => {
            let img_data = ''
            res.setEncoding('binary')
            res.on('data', (chunk) => {
                img_data += chunk
            })
            let saveImgPath = `${save_dir_path}/${img_name}.${img_type}`
            if (!this.is_dir_valid(save_dir_path)) {
                this.make_full_dir(save_dir_path)
            }
            res.on('end', () => {
                fs.writeFile(saveImgPath, img_data, 'binary', (err) => {
                    if (err) this.logger(`${this.prefix} 图片 ${img_url} 获取失败`, 'error')
                    else this.logger(`${this.prefix} 图片 ${img_url} 成功保存到 ${saveImgPath}`)
                })
            })
        }).end()
    }

    /**
     * 获取 redis 中 key 的值, 需要 await
     * @param {*} key 
     * @returns promise 对象
     */
    redis_get_key(key) {
        return redis.get(key)
    }

    /**
     * 查看 key 还有多久失效, 需要 await
     * @param {*} key 查看 tools.redis_gen_key 生成的 key 在 redis 中剩余的时间, 单位是 s
     * 
     * 使用例：
     * ```javascript
     * // 这里的 tools.redis_check_key() 在指定了 getKey 后, 返回 [bool, key]
     * await tools.redis_get_ttl(tools.redis_check_key(..., {getKey: true})[1])
     * ```
     * @returns 
     */
    redis_get_ttl(key) {
        return redis.ttl(key)
    }

    /**
     * 判断 key 是否已设置, 需要 await
     * @param {*} key 
     * @returns promise 对象
     */
    async redis_is_key_set(key) {
        return redis.get(key)
    }

    /**
     * 为 key: value 设置 redis 内容
     * @param {*} key 键
     * @param {*} seconds 该键值对生存时间, 单位为秒
     * @param {*} value 值
     */
    redis_set_key(key, seconds, value) {
        redis.setEx(key, seconds, value)
    }

    /**
     * 删除 redis 中的某个键值对, 需要 await
     * @param {*} key 键
     * @returns bool, 删除是否成功
     */
    async redis_del_key(key) {
        return (await redis.del(key)) ? true : false
    }

    /**
     * 生成统一格式的 key
     * @param { object } e 传入 this.e
     * @param {'private' | 'group' | 'global'} type 
     * 
     * > 生成 redis key 的类型
     * > 
     * > 私人: [p, private, isPrivate],
     * > 
     * > 群: [g, group, isGroup],
     * > 
     * > 全局: [global, isGlobal]
     * @returns 返回生成的 key
     */
    redis_gen_key(e, type) {
        let isPrivate = ['p', 'private', 'isPrivate'].includes(type) ? true : false,
            isGroup = ['g', 'group', 'isGroup'].includes(type) ? true : false,
            isGlobal = ['global', 'isGlobal'].includes(type) ? true : false,
            key = e.logFnc

        if (isGroup) {
            key += `.isGroup.${e.group_id}`
        } else if (isPrivate) {
            key += `.isPrivate`
        } else if (isGlobal) {
            key += `.isGlobal`
        }
        return key += `.${e.user_id}`
    }

    /**
     * 计算现在到目标时间剩余的秒数
     * @param {*} endTime 目标时间, 缺省是 '23:59:59', 即用于生成按日结算的 redis key
     * @returns 剩余时间, 单位是秒
     */
    redis_cal_left_time(endTime = '23:59:59') {
        return moment(endTime, 'HH:mm:ss').diff(moment(), 'seconds')
    }

    /**
     * redis 中是否有过值, 有返回 true, 没有则返回 false
     * 
     * 使用例：
     * ```js
     * let cd = 2
     * let redis_check_keyResult
     * 
     * // 检查 this.e 的 isGlobal 是否存在, 若存在直接返回 true
     * // 若不存在, 返回 false, 并向 redis 里生成一个 this.e.logFnc.isGlobal.qq号 的 key
     * redis_check_keyResult = tools.redis_check_key(this.e, 'global', cd)
     * 
     * // 检查 this.e 的 isGlabal 是否存在, 无论存在与否, 都会返回 查询到/新生成 的 [boolean, key] 列表
     * redis_check_keyResult = tools.redis_check_key(this.e, 'global', cd, { getKey: true })
     * // 然后用返回的 key 查询该 key 剩余的时间等
     * tools.redis_get_ttl(redis_check_keyResult[1])
     * ```
     * @param {*} e 传入 this.e
     * @param {*} type 私人: [p, private, isPrivate]，群: [g, group, isGroup]，全局: [global, isGlobal]
     * @param {*} cd 键值对存活时间, cd * timeFormat
     * @param {*} value 要设置的键值, 默认传入缺省是今日日期
     * @param {'hour' | 'minute'} timeFormat 时间单位默认是 hour，小时: [h, hour]，分钟: [m, min, minute]，秒: else
     * @param {boolean} isMaster 是否开启主人不受限制
     * @param {boolean} getKey 是否获取生成的 key
     * @param {boolean} redis_set_key 是否同时向 redis 添加一个 key
     * @returns 返回值为 bool 或 [key, bool](if getKey == true)
     */
    async redis_check_key(e, type, cd, options = {}) {

        let { value = moment().format('yyyy-MM-DD'), timeFormat = 'hour', isMaster = true, getKey = false, redis_set_key = true } = options

        let key = this.redis_gen_key(e, type)

        if (e.isMaster && isMaster) return getKey == true ? [false, key] : false
        if (await this.redis_is_key_set(key)) return getKey == true ? [true, key] : true

        if (['h', 'hour'].includes(timeFormat)) {
            timeFormat = 60 * 60
        } else if (['m', 'min', 'minute'].includes(timeFormat)) {
            timeFormat = 60
        } else {
            timeFormat = 1
        }

        if (redis_set_key) this.redis_set_key(key, timeFormat * cd, value)
        return getKey == true ? [false, key] : false

    }
}

export default new utils()