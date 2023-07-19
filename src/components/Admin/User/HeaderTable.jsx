/** @format */

import { TiPlus } from "react-icons/ti";
import { Button } from "antd";
import * as XLSX from "xlsx";

import { CgImport } from "react-icons/cg";
import { AiOutlineCloudUpload, AiOutlineReload } from "react-icons/ai";
const HeaderTable = ({
  refreshData,
  setOpenModalCreate,
  setOpenModalImport,
  listUser,
}) => {
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(listUser);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };
  return (
    <>
      <div className="table-header">
        <span className="table-title">Table List Users</span>
        <div className="table-actions-group">
          <Button
            type="primary"
            icon={<AiOutlineCloudUpload />}
            onClick={downloadExcel}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<CgImport />}
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<TiPlus />}
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <div className="btn-reload" onClick={refreshData}>
            <AiOutlineReload />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTable;
