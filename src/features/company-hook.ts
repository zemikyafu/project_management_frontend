import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserCompany,getCompanyById, createCompany,updateCompany } from '../api/company-service';
import { UUID } from "crypto";

interface Company {
    id: UUID
    name: string;
    email: string;
    address: string;
}

const SELECTED_COMPANY_KEY = "selectedCompany";
export function selectedCompanyKey() {
  return [SELECTED_COMPANY_KEY];
}

const QUERY_KEY="companies";
export function companyKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id];
  }

  return [QUERY_KEY];
}

export function useSelectedCompany() {
    const queryClient = useQueryClient();

    const setSelectedCompany = (companyId: string) => {
    queryClient.setQueryData(selectedCompanyKey(),companyId);

    }

    const getSelectedCompany = () => {
        return queryClient.getQueryData<String>(selectedCompanyKey());
    }

    return { setSelectedCompany, getSelectedCompany };
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