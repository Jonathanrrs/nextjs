import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupsOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { SummaryTile } from "../../components/admin";
import { AdminLayout } from "../../components/layouts";
import { DashboardSummaryResponse } from "../../interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000 /* 30 segundos */,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOders}
          subTitle="Ordenes totales"
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle="Clientes"
          icon={<GroupsOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle="Sin existencia"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle="Bajo inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle="Actualziación en:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
