const sequelize = require("../models/postgres")
const Movies = require("../models/postgres/movie")




// function used to create movies
exports.createMovies = (payload) => {
    let createMovie = Movies.build(payload)
    return createMovie.save().then(result => {
        return {
            success: true,
            data: result,
            msg: "Successfully created Movie"
        }
    }).catch(error => {
        console.log(error)
        throw error
    })
}


// function used to find movies by payload
exports.findMoviesByEmail = async (payload) => {
    return await sequelize.query(`SELECT * FROM movies WHERE email = '${payload.email}'`, { type: sequelize.QueryTypes.SELECT })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the movies details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to find movies by payload
exports.findMoviesByPayload = async (payload) => {
    return Movies.findOne({
        where: payload
    })
        // return await sequelize.query(`SELECT * FROM movies WHERE id = '${payload.id}'`, { type: sequelize.QueryTypes.SELECT })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the movies details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to update movies by payload
exports.updateMoviesByPayload = async (payload) => {
    return Movies.update(payload, { where: { id: payload.id } })
        // return await sequelize.query(`UPDATE movies SET name = '${payload.name}', releaseDate = '${new Date(payload.releaseDate)}', rating = '${payload.rating}' ,genre = '${payload.genre}' ,cast = ${payload.cast} WHERE id = '${payload.id}'`, { type: sequelize.QueryTypes.UPDATE })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully updated the movies details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to delete movies by payload
exports.deleteMoviesByPayload = async (id) => {
    return Movies.destroy({ where: { id: id } })
        // return await sequelize.query(`DELETE FROM movies WHERE id = '${payload.id}'`, { type: sequelize.QueryTypes.DELETE })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully deleted the movies details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}