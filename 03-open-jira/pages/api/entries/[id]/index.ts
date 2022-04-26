import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models/Entry";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "El id no es válido " + id });
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      return res.status(400).json({ message: "Método no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entradas con ese ID " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  /* esta es mas pesada porque se hace otra consulta */
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      /* para que revise el estado sea uno de los permitidos */
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

  /* es lo mismo que lo de arriba */
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save()
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res
      .status(400)
      .json({ message: "No hay entradas con ese ID " + id });
  }

  return res.status(200).json(entry);
};
