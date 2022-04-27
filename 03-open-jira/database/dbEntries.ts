import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry, IEntry } from "../models";
export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  /* lean informacion minima basica para poder trabajar */
  const entry = await Entry.findById(id).lean();
  await db.disconnect();

  // return entry; /* no va a funcionar por la serializacion */
  /* esto es la solucion universal */
  return JSON.parse(
    JSON.stringify(entry)
  ); 
};
