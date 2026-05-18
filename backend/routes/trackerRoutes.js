const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/trackerController");

const router = express.Router();

router.get("/", authMiddleware, getUsers);

router.get("/:id", authMiddleware, getUserById);

router.post("/", authMiddleware, createUser);

router.put("/:id", authMiddleware, updateUser);

router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;