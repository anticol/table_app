import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/User";

const fetchUsers = async (size: number): Promise<User[]> => {
    const response = await axios.get(
        `https://random-data-api.com/api/users/random_user?size=${size}`
    );
    return response.data;
};

export const useUsers = (size: number) => {
    return useQuery<User[]>({
        queryKey: ["users", size], // Include size in the queryKey for caching
        queryFn: () => fetchUsers(size), // Pass size to the fetch function
        retry: 2,
        staleTime: 10000,
    });
};
