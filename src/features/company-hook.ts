import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserCompany,getCompanyById, createCompany,updateCompany } from '../api/companyService';
import { UUID } from "crypto";

interface Company {
    id: UUID
    name: string;
    email: string;
    address: string;
}
const QUERY_KEY="companies";

export function companyKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id];
  }

  return [QUERY_KEY];
}


export function  useFetchCompanies  ()  {
     return useQuery({queryKey:companyKey(),queryFn: () => fetchUserCompany(),staleTime:Infinity,});

};
export function  useFetchCompany  (companyId: string)  {
    return useQuery({queryKey:companyKey(companyId),queryFn: () => getCompanyById(companyId),});

};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();

   const mutation=useMutation<Company,Error,Omit<Company,'id'>>({
        mutationFn: (companyData) => createCompany(companyData.name,companyData.email,companyData.address),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:companyKey()});
        },
    });
    return {newCompany:mutation,errors:mutation.error}
    
};

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    const mutation=useMutation<Company,Error,Company>({
        mutationFn: (companyData) => updateCompany(companyData.id,companyData.name,companyData.email,companyData.address),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:companyKey()});
        },
    });
    return {updatedCompany:mutation,errors:mutation.error}
    
};