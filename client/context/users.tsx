import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { getUsers } from "../api";
import { QueryKeys, Me } from "../types";

const UserContext = createContext<{
  users: Me[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function UserContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery([ QueryKeys.users ], getUsers);

  return (
    <UserContext.Provider
      value={{
        users: data,
        refetch,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };