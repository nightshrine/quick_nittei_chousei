import { UserContext } from "@/definitions/Auth";
import { createContext } from "react";

export const userContext = createContext<UserContext | undefined>(undefined);