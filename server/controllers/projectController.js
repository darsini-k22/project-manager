const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const { constants } = require("../constants");

//@desc Get all projects
//@route GET /api/projects/
//@access public

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  const count = await Project.countDocuments({});
  if (!projects) {
    res.sendStatus(constants.NOT_FOUND);
    throw new Error("There are no projects found!");
  }
  // console.log(count);
  res.status(200).json({
    projects,
    count,
  });
});

//@desc Get project
//@route GET /api/projects/:id
//@access public

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(constants.NOT_FOUND).json({ message: "Id not found!" });
    throw new Error("Project Not Found!");
  }
  console.log(project);
  res.status(200).json(project);
});

//@desc Create project
//@route POST /api/projects/
//@access public

const createProject = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, description, due_date, creator_name, creator_email } =
    req.body;
  if (!title || !description || !due_date || !creator_name || !creator_email) {
    res.sendStatus(400);
    throw new Error("Fields are missing!");
  }
  await Project.create({
    title,
    description,
    due_date,
    creator_name,
    creator_email,
  })
    .then(() => {
      console.log("Project is saved");
    })
    .catch((e) => {
      console.log(e.message);
    });

  res.status(200).json({ message: "Project created!" });
});

//@desc Update Project
//@route PUT /api/projects/:id
//@access public

const updateProject = asyncHandler(async (req, res) => {
  const { title, description, due_date, creator_name, creator_email, status } =
    req.body;

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { title, description, due_date, creator_name, creator_email, status },
    { new: true }
  );

  if (!project) {
    res.status(constants.NOT_FOUND).json({ error: "Project not found" });
    return;
  }

  res
    .status(200)
    .json({ message: `Updated Project: ${req.params.id}`, project });
});

//@desc Delete a project
//@route DELETE /api/projects/:id
//@access private(creator)

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Deleted successfully!");
    })
    .catch((e) => {
      console.log(e.message);
    });

  if (!project) {
    res.status(constants.NOT_FOUND).json({ message: "Id not found" });
    throw new Error("Id not found!");
  }
  res.status(200).json({ message: `Deleted Project: ${req.params.id}` });
});

//@desc Delete all projects
//@route DELETE /api/projects/
//@access private(admin)

const deleteProjects = asyncHandler(async (req, res) => {
  const projects = await Project.deleteMany()
    .then(() => {
      console.log("Deleted all");
    })
    .catch((e) => {
      console.log(e.message);
    });
  // if (!projects) {
  //   res.send(constants.NOT_FOUND).json({ message: "No projects found!" });
  //   throw new Error("No projects found!");
  // }
  res.status(200).json({ message: "Deleted all Projects" });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  deleteProjects,
};
