import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters,  } from "@tanstack/react-query";
import { getMeta } from "../api";
import { Meta, QueryKeys } from "../types";

const MetaContext = createContext<{
  meta: Meta[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function MetaContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery([ QueryKeys.meta ], getMeta);

  return (
    <MetaContext.Provider value={{ meta: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </MetaContext.Provider>
  );
}

const useMeta = () => useContext(MetaContext);

export { MetaContextProvider, useMeta };