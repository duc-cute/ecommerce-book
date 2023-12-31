/** @format */

import { TiPlus } from "react-icons/ti";
import { Button } from "antd";

import { CgImport } from "react-icons/cg";
import { AiOutlineCloudUpload, AiOutlineReload } from "react-icons/ai";
const HeaderTable = ({
  refreshData,
  setOpenModalCreate,
  setOpenModalImport,
  handleExportData,
}) => {
  return (
    <>
      <div className="table-header">
        <span className="table-title">Table List Books</span>
        <div className="table-actions-group">
          <Button
            type="primary"
            icon={<AiOutlineCloudUpload />}
            onClick={handleExportData}
          >
            Export
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
