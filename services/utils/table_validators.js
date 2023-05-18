const tables_repository = require("../../repository/tables_repository");

let err = { message: "", status: 400 };

exports.validateTableId = async (id) => {
  const tableSelected = await tables_repository.getTableById(id);
  if (tableSelected.rowCount == 0) {
    err = {
      message: `No table with id ${id} found.`,
      status: 404,
    };
    throw err;
  }
};
