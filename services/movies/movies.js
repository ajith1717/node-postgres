const { createMovies, findMoviesByEmail, updateMoviesByPayload, deleteMoviesByPayload, findMoviesById, findMoviesByPayload } = require("../../data-access/moviesDAO")





// function used to create movies
exports.createMovies = async (payload) => {
    try {
        payload.releaseDate = new Date(payload.releaseDate)
        let result = await createMovies(payload)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}


// function used to fetch user created movies
exports.getMoviesCreatedByUser = async (email) => {
    try {
        let result = await findMoviesByEmail({ email: email })
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

// function used to update movies
exports.updateMovies = async (payload) => {
    try {
        let result = await updateMoviesByPayload(payload)
        if (result.success) {
            // fetch the updated movies details
            let moviesDetails = await findMoviesByPayload({ id: payload.id })
            result.data = moviesDetails.data
            result.msg = "Successfully updated the movies details"
            return result

        } else {
            result.msg = "Failed to update the movies details"
            return result


        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


// function used to delete movies
exports.deleteMoviesById = async (id) => {
    try {
        let result = await deleteMoviesByPayload(id)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}