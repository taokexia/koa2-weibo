/*
 * @Author: taokexia
 * @Date: 2020-01-31 10:33:49
 * @LastEditTime : 2020-01-31 11:32:53
 * @LastEditors  : Please set LastEditors
 * @Description: utils controller
 * @FilePath: \koa2-weibo-code\src\controller\utils.js
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 *1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {string} size 文件体积大小
 * @param {string} filePath 文件路径
 * @returns
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    // 删除上传文件
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
