import {
    filterData,
    sortData,
    paginateData,
    generateCsvData,
} from "./tableUtils";
import { User } from "../../types/User";

const mockUsers: Partial<User>[] = [
    {
        id: 1,
        first_name: "Alice",
        last_name: "Doe",
        username: "alice123",
        email: "alice@example.com",
    },
    {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        username: "bob456",
        email: "bob@example.com",
    },
    {
        id: 3,
        first_name: "Charlie",
        last_name: "Brown",
        username: "charlie789",
        email: "charlie@example.com",
    },
];

describe("filterData", () => {
    it("should return all users if query is empty", () => {
        expect(filterData(mockUsers as User[], "")).toEqual(mockUsers);
    });

    it("should filter users by first_name", () => {
        expect(filterData(mockUsers as User[], "Alice")).toEqual([mockUsers[0]]);
    });

    it("should filter users by last_name", () => {
        expect(filterData(mockUsers as User[], "Smith")).toEqual([mockUsers[1]]);
    });

    it("should handle case-insensitive queries", () => {
        expect(filterData(mockUsers as User[], "alice")).toEqual([mockUsers[0]]);
    });

    it("should filter users by username", () => {
        expect(filterData(mockUsers as User[], "alice123")).toEqual([mockUsers[0]]);
    });

    it("should filter users by email", () => {
        expect(filterData(mockUsers as User[], "bob@example.com")).toEqual([mockUsers[1]]);
    });

    it("should filter users by email 2 ", () => {
        expect(filterData(mockUsers as User[], "@example.com")).toEqual(mockUsers);
    });

    it("should return multiple matches if query matches multiple users", () => {
        const extraUser = {
            id: 4,
            first_name: "Alice",
            last_name: "Wonder",
            username: "alice456",
            email: "alice456@example.com",
        };
        const usersWithDuplicateFirstName = [...mockUsers, extraUser];
        expect(filterData(usersWithDuplicateFirstName as User[], "Alice")).toEqual([
            mockUsers[0],
            extraUser,
        ]);
    });

    it("should return an empty array if no match is found", () => {
        expect(filterData(mockUsers as User[], "NotExists")).toEqual([]);
    });

    it("should return an empty array if input data is empty", () => {
        expect(filterData([], "Alice")).toEqual([]);
    });
});

describe("sortData", () => {
    it("should sort users by first_name in ascending order", () => {
        const sorted = sortData(mockUsers as User[], "first_name", "asc");
        expect(sorted.map((u) => u.first_name)).toEqual(["Alice", "Bob", "Charlie"]);
    });

    it("should sort users by first_name in descending order", () => {
        const sorted = sortData(mockUsers as User[], "first_name", "desc");
        expect(sorted.map((u) => u.first_name)).toEqual(["Charlie", "Bob", "Alice"]);
    });

    it("should sort users by last_name in ascending order", () => {
        const sorted = sortData(mockUsers as User[], "last_name", "asc");
        expect(sorted.map((u) => u.last_name)).toEqual(["Brown", "Doe", "Smith"]);
    });

    it("should sort users by last_name in descending order", () => {
        const sorted = sortData(mockUsers as User[], "last_name", "desc");
        expect(sorted.map((u) => u.last_name)).toEqual(["Smith", "Doe", "Brown"]);
    });

    it("should return an empty array if input data is empty", () => {
        const sorted = sortData([], "first_name", "asc");
        expect(sorted).toEqual([]);
    });
});

describe("paginateData", () => {
    it("should return the correct data for the first page", () => {
        const paginated = paginateData(mockUsers as User[], 0, 2);
        expect(paginated).toEqual([mockUsers[0], mockUsers[1]]);
    });

    it("should return the correct data for the second page", () => {
        const paginated = paginateData(mockUsers as User[], 1, 2);
        expect(paginated).toEqual([mockUsers[2]]);
    });

    it("should return an empty array if the page exceeds available data", () => {
        const paginated = paginateData(mockUsers as User[], 2, 2);
        expect(paginated).toEqual([]);
    });

    it("should return the correct data if page size is larger than data set", () => {
        const paginated = paginateData(mockUsers as User[], 0, 10);
        expect(paginated).toEqual(mockUsers);
    });

    it("should return an empty array if input data is empty", () => {
        const paginated = paginateData([], 0, 2);
        expect(paginated).toEqual([]);
    });
});

describe("generateCsvData", () => {
    it("should generate CSV data with all fields", () => {
        const csvData = generateCsvData(mockUsers as User[]);
        expect(csvData).toEqual([
            {
                id: 1,
                first_name: "Alice",
                last_name: "Doe",
                username: "alice123",
                email: "alice@example.com",
            },
            {
                id: 2,
                first_name: "Bob",
                last_name: "Smith",
                username: "bob456",
                email: "bob@example.com",
            },
            {
                id: 3,
                first_name: "Charlie",
                last_name: "Brown",
                username: "charlie789",
                email: "charlie@example.com",
            },
        ]);
    });

    it("should handle an empty dataset gracefully", () => {
        const csvData = generateCsvData([]);
        expect(csvData).toEqual([]);
    });

    it("should handle missing optional fields in users gracefully", () => {
        const incompleteUsers = [
            {
                id: 4,
                first_name: "Dave",
            },
        ] as Partial<User>[];
        const csvData = generateCsvData(incompleteUsers as User[]);
        expect(csvData).toEqual([
            {
                id: 4,
                first_name: "Dave",
            },
        ]);
    });
});
