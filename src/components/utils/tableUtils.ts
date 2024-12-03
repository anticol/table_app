import { User } from "../../types/User";

/**
 * Filters data based on search query.
 */
export const filterData = (data: User[], query: string): User[] => {
    if (!query) return data;

    const lowerCaseQuery = query.toLowerCase();

    return data.filter((user) =>
        Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(lowerCaseQuery)
    );
};

/**
 * Sorts data based on the specified field and order.
 */
export const sortData = <T>(
    data: T[],
    field: keyof T,
    order: "asc" | "desc"
): T[] => {
    return [...data].sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
    });
};

/**
 * Paginates the given data.
 */
export const paginateData = <T>(data: T[], page: number, rowsPerPage: number): T[] => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
};

/**
 * Generates CSV data excluding fields with complex objects.
 */
export const generateCsvData = (data: User[]): Record<string, any>[] => {
    return data.map((user) =>
        Object.keys(user).reduce((obj, key) => {
            const value = user[key as keyof User];
            if (typeof value !== "object" || value === null) {
                obj[key] = value; // Add only non-object fields
            }
            return obj;
        }, {} as Record<string, any>)
    );
};
