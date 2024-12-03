import { Avatar } from "@mui/material";
import { TableColumn } from "../../types/Table";
import dayjs from "dayjs";

export const userTableColumns: TableColumn[] = [
    { label: "ID", field: "id", sortable: true },
    {
        label: "Avatar",
        field: "avatar",
        sortable: false,
        render: (user) => <Avatar src={user.avatar} alt={user.username} />,
    },
    {
        label: "Username",
        field: "username",
        sortable: true,
    },
    {
        label: "Name",
        field: "first_name",
        sortable: true,
        render: (user) => (
            <span>
                {user.first_name} {user.last_name}
            </span>
        ),
    },
    {
        label: "Email",
        field: "email",
        sortable: false,
        render: (user) => <a href={`mailto:${user.email}`}>{user.email}</a>,
    },
    {
        label: "Date of Birth",
        field: "date_of_birth",
        sortable: false,
        render: (user) => (
            <span>{dayjs(new Date(user.date_of_birth)).format("DD.MM.YYYY")}</span>
        ),
    },
    {
        label: "Gender",
        field: "gender",
        sortable: true,
    },
];
