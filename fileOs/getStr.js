var fs = require("fs")
var path = require("path")
var request = require("request")
var https = require("https")
let imgs = []
let reg = /(https:\/\/www\.xpel\.com\.cn\/).*?(jpg|png|gif)/gi

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
  let str = (data.toString() || "").match(reg) || []
  if (str.length) {
    imgs = imgs.concat(str)
  }
}

function write(data) {
  let str = ";\n" + data.join(";\n")
  fs.writeFile(
    "./imgs.md",
    str,
    { flag: "a", encoding: "utf-8", mode: "0666" },
    function (err) {
      if (err) {
        console.log("文件写入失败")
      } else {
        console.log("文件写入成功")
        downloadImg(data)
      }
    }
  )
}

function downloadImg(allList) {
  allList.forEach((url) => {
    // 方法一
    // const name = url.slice(url.lastIndexOf("/") + 1)
    // request(url).pipe(fs.createWriteStream("./imgs/" + name))
    // 方法二
    var obj = path.parse(url)
    var fn = obj.base //获取保存图片名
    var stream = fs.createWriteStream("./imgs/" + fn)
    https.get(url, function (res) {
      res.pipe(stream)
    })
  })
}

readFileList("./xpel/")

setTimeout(function () {
  write(imgs)
}, 8000)
