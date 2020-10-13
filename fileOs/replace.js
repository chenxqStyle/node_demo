var fs = require("fs")
var path = require("path")
// let obj = require("./obj.json")
let reg = /(https:\/\/www\.xpel\.com\.cn\/).*?(jpg|png|gif)/gi
let host = "http://test.zhiz.top/xpel/myImgs/"

function readFileList(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item)) //递归读取文件
    } else {
      collectStr(fullPath, index)
    }
  })
}

function collectStr(fullPath, index) {
  console.log("index:", index, ";fullPath:", fullPath)
  let data = fs.readFileSync(fullPath)
  let str = data.toString()
  let leftStrArr = str.match(reg) || []

  leftStrArr.forEach((item) => {
    let fileName = getFileName(item)
    // let rightStr = host + obj[fileName]
    let rightStr = host + fileName
    

    console.log("status:", str.indexOf(item))
    while (str.indexOf(item) != -1) {
      str = str.replace(item, rightStr)
    }
  })
  write(str, fullPath)
}

function getFileName(url) {
  if (url) {
    // return (str = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf(".")))
    return (str = url.slice(url.lastIndexOf("/") + 1))
  }
}

function write(data, fullPath) {
  fs.writeFile(
    fullPath,
    data,
    { flag: "w", encoding: "utf-8", mode: "0666" },
    function (err) {
      if (err) {
        console.log("文件写入失败")
      } else {
        console.log("文件写入成功")
      }
    }
  )
}

readFileList("./xpel/")
