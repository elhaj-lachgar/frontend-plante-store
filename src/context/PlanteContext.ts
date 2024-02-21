import { createContext } from "react";
import { TPLante, TPagination } from "../lib/utils";

export const initPagination: TPagination = {
  limit: 0,
  page: 0,
  total: 0,
  totalPages: 1,
};

type TPlanteContext = {
  plantes: TPLante[];
  setPlantes: (plates: TPLante[]) => void;
  search: boolean;
  setSearch: (search: boolean) => void;
  pagination : TPagination;
  changePagination:(pagination : TPagination) => void;
};

const InitState: TPlanteContext = {
  plantes: [],
  setPlantes: () => {
    console.log("hi");
  },
  search: false,
  setSearch: () => console.log("hi"),
  pagination: initPagination,
  changePagination:() => console.log("hi"),
};

export const PlanteContext = createContext<TPlanteContext>(InitState);
