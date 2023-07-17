/** @format */

import InputSearch from "../../components/Admin/User/InputSearch";
import UserTable from "../../components/Admin/User/UserTable";
import "./admin.scss";
const AdminPage = () => {
  return (
    <>
      <div className="admin-input-search">
        <InputSearch />
      </div>
      <div className="admin-table-user">
        <UserTable />
      </div>
    </>
  );
};

export default AdminPage;
