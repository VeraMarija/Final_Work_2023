const express = require("express");
const validate = require("express-validation");
const userController = require("../../controllers/UserController");
const { checkAuth, checkPermission } = require("../../middleware/auth");
/* const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); */
const {upload} = require('../../middleware/multer');

const router = express.Router();

/* const uniquId = uuidv4();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
 */

router.get("/all", checkAuth, checkPermission, userController.getAll);

router.post(
  "/",
  checkAuth,
  checkPermission,
  upload.single("picture"),
  userController.createUser
);

router.put(
  "/:userId",
  checkAuth,
  checkPermission,
  upload.single("picture"),
  userController.updateUser
);

router.delete(
  "/:userId",
  checkAuth,
  checkPermission,
  userController.deleteUser
);

router.get("/:userId", checkAuth, checkPermission, userController.getByUserId);

module.exports = router;
