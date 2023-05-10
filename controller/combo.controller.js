const { sequelize } = require("../models/index");
const db = require("../models/index");
const { validationTable } = require("../validator");

//add the data in select master and option master
const comboGenerate = async (req, res) => {
  const t = await sequelize.transaction();
  const { name, type, optionObject } = req.body;
  try {
    const addFields = await db.Select_master.create(
      {
        name,
        type,
        Option_masters: optionObject,
      },
      {
        include: [{ model: db.Option_master }],
      },
      {
        transaction: t,
      }
    );

    const curr = await t.commit();

    console.log("transaction done", curr);

    return res.json({
      status: "Success",
      data: addFields,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

// add the data only in the option master
const optionAddPost = async (req, res) => {
  try {
    const { optionObject } = req.body;
    console.log(optionObject, "{{{{{{{");

    const addData = await db.Option_master.bulkCreate(optionObject);

    return res.json({
      status: "Success",
      data: addData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

async function selectOptionBoth(tabel1, table2) {
  const selectdata = await db.Select_master.findAll({});

  let s = "";

  for (let i = 0; i < selectdata.length; i++) {
    let typeSelect = selectdata[i].type;
    let name = selectdata[i].name;

    const data = await db.Option_master.findAll({
      where: {
        selectId: i + 1,
      },
    });

    if (typeSelect == "dropdown") {
      s += `<select name="${name}" id="${name}">
      <option value="" >Select you ${name}</option>`;

      for (let j = 0; j < data.length; j++) {
        s += `<option value="">${data[j].name}</option>`;
      }

      s += ` </select><hr>`;
    }

    if (typeSelect == "radio" || typeSelect == "checkbox") {
      for (let j = 0; j < data.length; j++) {
        s += `<input type="${typeSelect}" name="${typeSelect}" >
        <label>${data[j].name} </label>`;
      }
      s += `<hr>`;
    }
  }

  return s;
}

// show the data to front end and also insert to the database
const showData = async (req, res) => {
  console.log(req.body, "oofisdjf");

  const { error, value } = validationTable(req.body);

  if (error) {
    console.log(error.details);
  } else {
    console.log(value);
  }

  // let totalKeys = Object.keys(req.body);

  // let totalOfFields = totalKeys.length - 2;

  // let name = req.body.selectName;
  // let type = req.body.type;

  // if (name.length > 0 && type.length > 0) {
  //   let len = name.length;

  //   //how many "fields_" means how many select options
  //   for (let i = 1; i <= totalOfFields; i++) {
  //     let pushOption = [];
  //     let fieldName = "fields_" + i;
  //     let lenOption = 0;
  //     let valuesOfField = eval("req.body." + fieldName);

  //     let flagOption = Array.isArray(valuesOfField);

  //     //if only one option is given
  //     if (flagOption == false) {
  //       let s = {
  //         name: `${valuesOfField}`,
  //       };
  //       pushOption.push(s);
  //     }

  //     //more than one option get as array
  //     else {
  //       lenOption = valuesOfField.length;
  //     }

  //     //generate the option array of object to pass in "Option_master"
  //     for (let i = 0; i < lenOption; i++) {
  //       let s = {
  //         name: `${valuesOfField[i]}`,
  //       };

  //       pushOption.push(s);
  //     }

  //     // add data to the database
  //     const addFields = await db.Select_master.create(
  //       {
  //         name: name[i - 1],
  //         type: type[i - 1],
  //         Option_masters: pushOption,
  //       },
  //       {
  //         include: [{ model: db.Option_master }],
  //       }
  //     );

  //     console.log(addFields);
  //   }
  // }

  try {
    const { table1, table2 } = req.body;

    let s = await selectOptionBoth(table1, table2);

    return res.send(error.details[0].message);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

//update the option field
const updateOption = async (req, res) => {
  const optionId = req.params.id;
  const { name } = req.body;
  const data = await db.Option_master.update(
    {
      name,
    },
    {
      where: {
        id: optionId,
      },
    }
  );

  return res.json(data);
};

//update the select field
const updateSelect = async (req, res) => {
  try {
    const selectId = req.params.id;
    const { name, type } = req.body;
    const data = await db.Select_master.update(
      {
        name,
        type,
      },
      {
        where: {
          id: selectId,
        },
      }
    );

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

//delete the options
const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    const data = await db.Option_master.destroy({
      where: {
        id: optionId,
      },
    });

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

//delete the select
const deleteSelect = async (req, res) => {
  try {
    const selectId = req.params.id;

    const data = await db.Select_master.destroy({
      where: {
        id: selectId,
      },
    });

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Fail",
      data: "data is not added",
    });
  }
};

//recover the option
const recoverOption = async (req, res) => {
  const data = await db.Option_master.restore();

  return res.json(data);
};

//recover the select
const restoreSelect = async (req, res) => {
  const data = await db.Select_master.restore();

  return res.json(data);
};
//edit the form from frontend
const editForm = async (req, res) => {
  console.log(req.body);
  res.render("edit");
};

const edit = async (req, res) => {
  console.log(req.body);

  let name = req.body.name;
  let types = req.body.type;
  let arroption = req.body.optionfield || 0;

  let pushOption = [];
  for (let i = 0; i < arroption.length; i++) {
    let s = `{
      name:${arroption[i]}
    }`;

    pushOption.push(s);
  }

  console.log(pushOption, "optionnnnnn");
  console.log("check");

  res.json(true);
};

module.exports = {
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
};
