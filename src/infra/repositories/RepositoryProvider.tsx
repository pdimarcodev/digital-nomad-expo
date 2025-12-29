import { IAuthRepo } from "@/src/domain/auth/IAuthRepo";
import { ICategoryRepo } from "@/src/domain/category/ICategoryRepo";
import { ICityRepo } from "@/src/domain/city/ICityRepo";
import React, { useContext } from "react";

export type Repositories = {
  category: ICategoryRepo;
  city: ICityRepo;
  auth: IAuthRepo;
};

const RepositoryContext = React.createContext<Repositories | null>(null);

export const RepositoryProvider = RepositoryContext.Provider;

export function useRepository(): Repositories {
  const repositories = useContext(RepositoryContext);

  if (!repositories) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }

  return repositories;
}
