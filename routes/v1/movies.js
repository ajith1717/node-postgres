const express = require("express");
const router = express.Router();

const moviesController = require("../../controllers/movies");
const { authenticateAPI } = require("../../config/passport");


// API for sign up user
router.post("/create", authenticateAPI, moviesController.createMovies);

// fetch all the movies created by the users
router.get("/list", authenticateAPI, moviesController.fetchAllTheMoviesCreatedByUsers);

// update the movies
router.put("/update", authenticateAPI, moviesController.updateMoviesById);

// delete the movies
router.delete("/delete/:id", authenticateAPI, moviesController.deleteMoviesById);


module.exports = router;
