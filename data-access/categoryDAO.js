// function used to add category
const Category = require("../models/mongodb/category")

// function used to update category by id
exports.addCategory = async (payload) => {
    try {
        return await Category.create(payload).then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully created category"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to create category"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

// function used to find category by _id
exports.getCategoryDetailsById = async (payload) => {
    try {
        return await Category.findOne(payload).then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetch all category"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to fetch all category"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err

    }
}


// function used to fetch all category
exports.fetchAllCategories = async () => {
    try {
        return await Category.find({}).lean().then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetch all category"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to fetch all category"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
}



// function used to update category by id
exports.updateCategoryId = async (payload, updatePayload) => {
    try {
        return await Category.findOneAndUpdate(payload, updatePayload).then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully update category by id"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to update category by id"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
}


// function used to delete category
exports.deleteCategoryId = async (payload) => {
    try {
        return await Category.findByIdAndDelete({ _id: payload._id }).then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully delete category"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to delete category"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
}



// function used to delete category
exports.deleteAllCategory = async () => {
    try {
        return await Category.deleteMany({}).then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully delete category"
            }
        }).catch(err => {
            console.log('err', err)
            return {
                success: false,
                data: err,
                msg: "Failed to delete category"
            }
        })
    } catch (err) {
        console.log('err', err)
        throw err
    }
}