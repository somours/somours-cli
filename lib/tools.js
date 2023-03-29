const fs = require("fs")
const path = require('path')
// const { copy } = require("fs-extra")

// 复制文件夹
function copyDir (srcDir, destDir) {
  console.log('srcDir', srcDir)
  if(srcDir.endsWith('node_modules')) { // 去除模板里的node_modules
    return
  }
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

// 复制
function copy(src, dest) {
  console.log('copy', src, dest)
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 判断文件夹是否为空
function fileIsEmpty (path) {
  return fs.readdirSync(path).length === 0
}

// 清空文件夹
function emptyDir (dir) {
  if (!fs.existsSync(dir)) { // 文件夹不存在
    return
  }
  for (const file of fs.readdirSync(dir)) {
    // baseline is Node 12 so can't use rmSync :(
    const absolutePath = path.resolve(dir, file)
    if (fs.lstatSync(absolutePath).isDirectory()) {
      emptyDir(absolutePath)
      fs.rmdirSync(absolutePath)
    } else {
      fs.unlinkSync(absolutePath)
    }
  }
}

module.exports = {
  emptyDir,
  fileIsEmpty,
  copy,
  copyDir
}
