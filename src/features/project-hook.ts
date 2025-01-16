import {Project} from "../types";
import {UUID} from "crypto";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import ProjectService from "../api/project-service";
import {ProjectCreateFormValues,ProjectUpdateFormValues} from "../schemas/project";
const QUERY_KEY="projects";

export function projectKey(id?:UUID){
    if(id){
        return [QUERY_KEY,id];
    }
    return [QUERY_KEY];
}

export function useFetchProjects(workspaceId:UUID){
    const{data,error,isLoading}= useQuery<Project[]>({
        queryKey:projectKey(workspaceId),
        queryFn: () => ProjectService.fetchCompanyProjects(workspaceId),
        enabled:!!workspaceId,
        staleTime:Infinity,
    });
    return {projects:data,error,isLoading};
}

export function useFetchProject(projectId:UUID,workspaceId:UUID){
    const{data,error,isLoading}= useQuery<Project>(
        {queryKey:projectKey(projectId),
        queryFn: () => ProjectService.fetchProjectById(projectId,workspaceId),
        enabled:!!projectId,
        staleTime:Infinity,
    });
    return {project:data,error,isLoading};
}

export function useCreateProject(workspaceId:UUID){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(projectData:ProjectCreateFormValues)=>ProjectService.createProject(projectData,workspaceId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:projectKey(workspaceId)});
        },
    });

}

export function useUpdateProject(workspaceId:UUID){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(projectData:ProjectUpdateFormValues)=>ProjectService.updateProject(projectData,workspaceId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:projectKey(workspaceId)});
        }
    });
}