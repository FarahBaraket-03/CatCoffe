import { Routes, Route } from "react-router-dom";
import CatAdmin from "../component_admin/CatAdmin";
import ClientAdmin from "../component_admin/ClientAdmin";
import MenuAdmin from "../component_admin/MenuAdmin";
import ResAdmin from "../component_admin/ResAdmin";
import Sidebar from "../component_admin/Sidebar";

const Admin = () => {
  return (
    <div className="row">
      <div className="col-lg-2 col-md-3">
        <Sidebar />
      </div>
      <div className="col-lg-10 col-md-9">
        <Routes>
          <Route path="/menu" element={<MenuAdmin />} />
          <Route path="/cats" element={<CatAdmin />} />
          <Route path="/reservation" element={<ResAdmin />} />
          <Route path="/customers" element={<ClientAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
