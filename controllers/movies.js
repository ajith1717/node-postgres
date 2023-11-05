const { HTTP_STATUS_CODE, errorSource } = require("../constants/general");
const { createMovies, getMoviesCreatedByUser, updateMovies, deleteMoviesById } = require("../services/movies/movies");



// function for create movies
exports.createMovies = async (req, res) => {
    try {
        let payload = req.body
        payload.email = req.user.email
        let result = await createMovies(payload);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating movie", errors: err }))
    }
}


// function for get movies
exports.fetchAllTheMoviesCreatedByUsers = async (req, res) => {
    try {
        let email = req.user.email
        let result = await getMoviesCreatedByUser(email);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during getting movie", errors: err }))
    }
}


// function used to update movies
exports.updateMoviesById = async (req, res) => {
    try {
        let payload = req.body
        payload.email = req.user.email
        let result = await updateMovies(payload);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during updating movie", errors: err }))
    }
}

// function used to delete movies
exports.deleteMoviesById = async (req, res) => {
    try {
        let id = req.params.id
        let result = await deleteMoviesById(id);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during deleting movie", errors: err }))
    }
}