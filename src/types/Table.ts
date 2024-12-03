import { ReactNode } from "react";
import { User } from "./User";

export interface TableColumn {
    label: string;
    field: keyof User;
    sortable: boolean;
    render?: (user: User) => ReactNode;
}