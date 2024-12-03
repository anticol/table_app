import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/User";


// Fetch user by ID from random data API
const fetchUserById = async (id: number): Promise<User> => {
    const response = await axios.get(`https://random-data-api.com/api/users/random_user?id=${id}`);
    return response.data;
};

// Custom hook to fetch user by ID
export const useUser = (userId: number) => {
    return useQuery<User>({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId),
        retry: 2,
        enabled: !!userId,
        staleTime: 10000,
    });
}