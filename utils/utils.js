
const jwt = require('jsonwebtoken');
const addSeconds = require('date-fns/addSeconds');
const sharp = require('sharp');


// function for sign jwt token
exports.signJWTToken = async (payload, options) => {
  // secret = process.env.COMMON_SECRET_KEY
  let token = await jwt.sign(payload, process.env.COMMON_SECRET_KEY, options)
  return token
}




// function is for  checking all the required fields are there
// function is for  checking all the required fields are there
exports.requiredFieldCheck = function (result, requiredFields) {
  try {

    result = result.map((item) => {
      Object.entries(item).forEach(([key, value]) => {
        item[key.toLocaleLowerCase()] = value
        if (key.toLocaleLowerCase() == "category") {
          item["category"] = value.trim().toLocaleLowerCase()
        }
      })
      return item
    })
    let completedCheck = 0
    for (let item of result) {
      completedCheck = completedCheck + 1
      for (let fields of requiredFields) {
        if (item[fields] == null || item[fields] == "") {
          if (item["name"] == "" || item["name"] == null) {
            return {
              success: false,
              msg: `${fields} filed is missing in row ${result.indexOf(item) + 1}`
            }
          } else {
            return {
              success: false,
              msg: `In ${item["name"]} , ${fields} is required`
            }
          }


        }

      }

    }
    if (completedCheck == result.length) {
      return { success: true, data: result }
    }


  } catch (err) {
    console.log(err)
    throw err
  }
}

