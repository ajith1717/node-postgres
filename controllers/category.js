const { errorLogger, logger } = require("../config/pino-config");
const { HTTP_STATUS_CODE } = require("../constants/general");
const { addCategory, fetchAllCategories, updateCategoryId, deleteCategoryId, reOrderCategory, uploadCategoryImages } = require("../services/category/category");

// function used to add category
exports.addCategory = async (req, res) => {
    try {
        let payload = req.body
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for add category `)
        let result = await addCategory(payload);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully add category `)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during add category `);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during add category `);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during add category ", errors: err }))
    }
}



// function used to fetch all category
exports.fetchAllCategories = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for fetch all category `)
        let result = await fetchAllCategories();
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully fetch all category `)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during fetch all category `);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during fetch all category `);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during fetch all category ", errors: err }))
    }
}


// function used to update category by id
exports.updateCategoryId = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for update category by id `)
        let result = await updateCategoryId(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully update category by id `)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during update category by id `);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during update category by id `);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during update category by id ", errors: err }))
    }
}



// function used to delete category
exports.reOrderCategory = async (req, res) => {
    try {
        console.log('req body')
        console.log(req.body)
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for updating category`)
        let result = await reOrderCategory(req.body.list);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully updated category list`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during updating category`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during delete category `);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during delete category ", errors: err }))
    }
}


// Function for update the Category images 
exports.uploadCategoryImages = async (req, res) => {
    try {
        let categoryId = req.body.categoryId
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for update Category images`)
        let result = await uploadCategoryImages({ images: req.files, categoryId });
        if (result.success) {

            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully updated Category images`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during update Category images`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during update Category images`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during update Category images", errors: err }))
    }
}