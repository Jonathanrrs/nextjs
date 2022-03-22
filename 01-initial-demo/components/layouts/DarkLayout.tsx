import { FC } from "react";

/* FC functional component puede ser un tipado */
export const DarkLayout: FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>Dark layout</h3>
      <div>{children}</div>
    </div>
  );
};
