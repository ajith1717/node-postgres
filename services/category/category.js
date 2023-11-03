const path = require("path");
const { addCategory, fetchAllCategories, updateCategoryId, deleteCategoryId, deleteAllCategory, getCategoryDetailsById } = require("../../data-access/categoryDAO");
const { compressImages } = require("../../utils/utils");
const fs = require('fs');


// function used to add category
exports.addCategory = async (payload) => {
    try {
        payload.title = payload.title?.trim().toLowerCase()
        payload.categoryId = payload.title?.toLowerCase().replaceAll(" ", "")
        let result = await addCategory(payload);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error) {
        console.log('error', error)
    }
}



// function used to fetch all category
exports.fetchAllCategories = async () => {
    try {
        let result = await fetchAllCategories();
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error) {
        console.log('error', error)
    }
}



// function used to update category by id
exports.updateCategoryId = async (payload) => {
    try {
        let result = await updateCategoryId({ _id: payload._id }, payload);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error) {
        console.log('error', error)
    }
}

// function used to update category by id
exports.reOrderCategory = async (payload) => {
    try {

        // fetch all the category 
        let fetchAllCategory = await fetchAllCategories();
        if (fetchAllCategory.success) {
            let category = fetchAllCategory.data
            // filter the category for delete
            let filterCategory = category.filter((item) => {
                return !payload.some((item2) => {
                    return item._id.toString() === item2.categoryId
                })
            })
            let errors = []
            // update the category by id 
            for (let items of payload) {
                let updateCategory = await updateCategoryId({ _id: items.categoryId }, { order: items.order })
                if (!updateCategory.success) {
                    errors.push(updateCategory)
                    // return updateCategory
                }
            }

            // delete the category by id
            for (let items of filterCategory) {
                let deleteCategory = await deleteCategoryId({ _id: items._id })
                if (!deleteCategory.success) {
                    errors.push(deleteCategory)
                    // return deleteCategory
                }
            }

            console.log('errors', errors)
            if (errors.length > 0) {
                return {
                    success: false,
                    data: errors,
                    msg: "Failed to re-order category"
                }
            } else {
                let updatedCategoryList = await fetchAllCategories();
                return {
                    success: true,
                    data: updatedCategoryList.data,
                    msg: "Successfully re-order category"
                }
            }
        }

        // // delete all the category from table 
        // let deleteCategory = await deleteAllCategory();
        // if (deleteCategory.success) {
        //     let result = await addCategory(payload);
        //     if (result.success) {
        //         return result
        //     } else {
        //         return result
        //     }
        // } else {
        //     console.log('deleteAllCategory', deleteAllCategory)
        //     return deleteCategory
        // }

    } catch (error) {
        console.log('error', error)
    }
}

// function used to delete category
exports.deleteCategoryId = async (payload) => {
    try {
        let result = await deleteCategoryId(payload);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error) {
        console.log('error', error)
    }
}



// Function for update the image product 
// exports.uploadCategoryImages = async ({ categoryId, images }) => {
//     try {
//         // get category details by id 
//         let category = await getCategoryDetailsById({ _id: categoryId });
//         if (category.success && category.data) {
//             let fileName = category.data.categoryId
//             // iterate the image files
//             let uploadedUrl = ""
//             console.log(images)
//             for (let i = 0; i < images.length; i++) {
//                 let imagePath = images[i].path
//                 let fieldName = images[i].fieldName
//                 let timeVal = new Date().getTime()

//                 // // compress the image 
//                 // let compressedImage = await compressImages(imagePath);
//                 // let ff = await compressedImage.toFile(`./compressedImg/${fileName}.jpg`)
//                 // // upload file to s3 bucket
//                 // const fileToUpload = fs.createReadStream(path.join(__dirname, `../../compressedImg/${fileName}.jpg`))

//                 let upload = await uploadFileToS3(images[i], `${fileName}_${timeVal}.jpg`, process.env.AWS_CATEGORIES_BKT_NAME, false)
//                 uploadedUrl = upload.url
//                 // add the image to product 
//             }
//             console.log('uploadedUrl', uploadedUrl)
//             // delete the compressed image
//             // fs.unlinkSync(path.join(__dirname, `../../output.jpg`))
//             // update the product
//             let updateProduct = await updateCategoryId({ _id: category.data._id }, { image: uploadedUrl });
//             if (updateProduct.success) {
//                 if (updateProduct.data != null) {
//                     updateProduct.data.image = uploadedUrl
//                 }
//                 return {
//                     success: true,
//                     data: {
//                         image: uploadedUrl
//                     },
//                     msg: "Successfully update category image"
//                 }
//             } else {
//                 return {
//                     success: false,
//                     data: {},
//                     msg: "Failed to update category image"
//                 }
//             }


//         } else {
//             return {
//                 success: false,
//                 data: {},
//                 msg: "Product not exists."
//             }
//         }
//         // if not exists. send error 

//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }