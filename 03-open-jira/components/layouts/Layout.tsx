import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { Nabvar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout: FC<Props> = ({ title = "OpenJira - App", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      {/* navbar */}
      <Nabvar />
      {/* sidebar */}
      <Sidebar />
      <Box sx={{ paddingTop: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
