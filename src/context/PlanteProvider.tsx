import React, { useState } from "react";
import { PlanteContext, initPagination } from "./PlanteContext";
import { TPLante, TPagination } from "../lib/utils";

function PlanteProvider({ children }: { children: React.ReactNode }) {
  const [plantes, setPlante] = useState<TPLante[]>([]);
  const [search, setSearch] = useState(false);
  const [pagination, setPagination] = useState<TPagination>(initPagination);
  const setPlantes = (params: TPLante[]) => {
    setPlante(params);
  };
  const changeSearch = (search: boolean) => setSearch(search);
  const changePagination = (pagination: TPagination) =>
    setPagination(pagination);
  return (
    <PlanteContext.Provider
      value={{
        plantes,
        setPlantes,
        setSearch: changeSearch,
        search,
        pagination,
        changePagination,
      }}
    >
      {children}
    </PlanteContext.Provider>
  );
}

export default PlanteProvider;
