import { User } from "@prisma/client";
import { ValueToOmit } from "../@types";

export interface AddUserRespoitory {
  handle(user: Omit<User, ValueToOmit>): Promise<void>;
}
