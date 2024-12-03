import { useState } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Typography,
    TextField,
    TableFooter,
    TablePagination,
    Box,
    Button,
} from "@mui/material";
import { CSVLink } from "react-csv";
import { useUsers } from "../../hooks/useFetchUsers";
import { Loading } from "./Loading";
import { Error } from "./Error";
import {
    filterData,
    sortData,
    paginateData,
    generateCsvData,
} from "../utils/tableUtils";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { userTableColumns } from "./tableScheme";

export const UsersTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const navigate = useNavigate();

    const { data, isLoading, isError, refetch } = useUsers(100);

    if (isLoading) return <Loading />;
    if (isError) return <Error refetch={refetch} />;

    const filteredData = filterData(data || [], search);
    const sortedData = sortField
        ? sortData(filteredData, sortField as keyof User, sortOrder)
        : filteredData;

    const paginatedData = paginateData(sortedData, page, rowsPerPage);

    const csvData = generateCsvData(filteredData);

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Random Users Table
            </Typography>
            <Box textAlign="right" marginY={2}>
                <CSVLink data={csvData} filename="user_data.csv">
                    <Button variant="contained" color="primary">
                        Export All Data to CSV
                    </Button>
                </CSVLink>
            </Box>
            <TextField
                label="Search by Name, Username or Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {userTableColumns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        sx={{
                                            fontWeight: "bold",
                                            cursor: column.sortable ? "pointer" : "default",
                                        }}
                                        onClick={() => {
                                            if (!column.sortable) return;
                                            setSortField((prevField) =>
                                                prevField === column.field
                                                    ? column.field
                                                    : column.field
                                            );
                                            setSortOrder((prevOrder) =>
                                                sortField === column.field && prevOrder === "asc" ? "desc" : "asc"
                                            );
                                        }}
                                    >
                                        {column.label}
                                        {column.sortable && (
                                            <Typography
                                                component="span"
                                                sx={{ fontSize: "0.75rem", marginLeft: 1 }}
                                            >
                                                {sortField === column.field
                                                    ? sortOrder === "asc"
                                                        ? "▲"
                                                        : "▼"
                                                    : ""}
                                            </Typography>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData.map((user) => (
                                <TableRow
                                    key={user.id}
                                    onClick={() => navigate(`/users/${user.id}`)}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "box-shadow 0.2s ease-in-out",
                                        "&:hover": {
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        },
                                    }}
                                >
                                    {userTableColumns.map((column) => (
                                        <TableCell key={column.field}>
                                            {column.render
                                                ? column.render(user)
                                                : String(user[column.field])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={(event, newPage) => setPage(newPage)}
                                    onRowsPerPageChange={(event) =>
                                        setRowsPerPage(parseInt(event.target.value, 10))
                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};
