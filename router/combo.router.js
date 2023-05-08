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
} = require("../controller/combo.controller");
const app = express();
const router = express.Router();

router.get("/show", showData);
router.post("/addboth", comboGenerate);
router.post("/addoption", optionAddPost);
router.put("/updateoption/:id", updateOption);
router.put("/updateselect/:id", updateSelect);
router.delete("/deleteoption/:id", deleteOption);
router.delete("/deleteselect/:id", deleteSelect);
router.get("/edit", editForm);
router.post("/recoveroption", recoverOption);
router.post("/restoreselect", restoreSelect);

module.exports = router;
