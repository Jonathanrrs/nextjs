import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";
import { IOrder } from "../../interfaces/order";

interface Props {
  order?: IOrder;
}

export const OrderSummary = ({ order }: Props) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

  const numberOfItemsFinal = order ? order.numberOfItems : numberOfItems;
  const subTotalFinal = order ? order.subTotal : subTotal;
  const totalFinal = order ? order.total : total;
  const taxFinal = order ? order.tax : tax;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItemsFinal} {numberOfItemsFinal > 1 ? "productos" : "producto"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotalFinal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})%
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(taxFinal)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(totalFinal)}</Typography>
      </Grid>
    </Grid>
  );
};
