"use strict"
let fs = require("fs")
let i = 0
let $ = "$"
//setting area
let directory = process.argv[2]
let format = "car-" + $
let obj = {}
// let format = $
let count = 0
//setting area
function rename(fileName, formation) {
  if (!fileName) {
    console.log("请输入文件夹名称！")
    return
  }

  fs.readdir(fileName, function (err, data) {
    count = data.length
    data.forEach(function (item) {
      i++
      let f
      let type = item.split(".")
      type = "." + type[type.length - 1]
      if (formation.length === 1) {
        f = i
      } else if (formation.startsWith("$")) {
        f = i + formation.split("$")[1]
      } else if (formation.endsWith("$")) {
        f = formation.split("$")[0] + i
      } else {
        let arr = formation.split("$")
        f = arr[0] + i + arr[1]
      }

      let str = item.split(".")[0]
      obj[str] = f + type
      if (count === i) {
        write(obj)
      }
      fs.rename(directory + "/" + item, directory + "/" + f + type, function (
        err
      ) {
        if (err) {
          throw err
        } else {
          console.log(f + "done!")
        }
      })
    })
  })
}

function write(data) {
  fs.writeFile(
    directory + "/obj.json",
    JSON.stringify(data),
    { flag: "a", encoding: "utf-8", mode: "0666" },
    function (err) {
      if (err) {
        console.log("文件写入失败")
      } else {
        console.log("文件写入成功")
      }
    }
  )
}

rename(directory, format)

// setTimeout(function () {
// write(obj)
// }, 10000)
