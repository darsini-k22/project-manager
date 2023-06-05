const express = require("express");
const app = express();

const router = express.Router();

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  deleteProjects,
} = require("../controllers/projectController");

//Get projects 
//Create project
//Delete all projects
router.route("/").get(getProjects).post(createProject).delete(deleteProjects);

//Get individual project
//Edit project
//Delete project
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);


module.exports = router;
