import { DashboardOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../components/layouts";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <h3>Hello world</h3>
    </AdminLayout>
  );
};

export default DashboardPage;
