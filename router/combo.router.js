var express = require("express");
const {
  comboGenerate,
  optionAddPost,
  showData,
  updateOption,
  updateSelect,
  deleteOption,
  deleteSelect,
  recoverOption,
  restoreSelect,
  editForm,
  edit,
} = require("../controller/combo.controller");
const app = express();
const router = express.Router();

router.post("/show", showData);
router.post("/addboth", comboGenerate);
router.post("/addoption", optionAddPost);
router.put("/updateoption/:id", updateOption);
router.put("/updateselect/:id", updateSelect);
router.delete("/deleteoption/:id", deleteOption);
router.delete("/deleteselect/:id", deleteSelect);
router.get("/editform", editForm);
router.post("/recoveroption", recoverOption);
router.post("/restoreselect", restoreSelect);
router.post("/edit", edit);

module.exports = router;
