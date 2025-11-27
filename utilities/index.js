// Author: Reagan Otema
const invModel = require('../models/inventoryModel');

exports.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications();
    let classificationList = '<select name="classification_id" id="classificationList" required>';
    classificationList += "<option value=''>Choose a Classification</option>";
    data.rows.forEach(row => {
        classificationList += `<option value='${row.classification_id}'${classification_id == row.classification_id ? ' selected' : ''}>${row.classification_name}</option>`;
    });
    classificationList += '</select>';
    return classificationList;
};
