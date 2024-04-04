import { User } from "@prisma/client";
import { DataBaseExtraValues } from "../@types";

export interface AddUserRespoitory {
  handle(user: Omit<User, DataBaseExtraValues>): Promise<void>;
}
