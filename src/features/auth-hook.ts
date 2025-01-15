import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthService from "../api/auth-service";
import { UUID } from "crypto";
import { ProfileFormValues, LoginFormValues,UserRead,SigninResponse,SignupFormValues } from "../schemas/auth";

const QUERY_KEY = "profile"

export function profilQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }

  return [QUERY_KEY]
}
export function usefetchProfile(userId: UUID  ) {
  const { data, error, isPending } = useQuery({
    queryKey:profilQueryKey(),
    queryFn: () => AuthService.getUserProfile(userId),
    enabled: !!userId ,
    staleTime: 1000 * 60 * 50, 

  });

  return {
    profile: data,
    error,
    isPending,
  };
}

export function useUpdateProfile(userId: UUID, values: ProfileFormValues) {
    const queryClient = useQueryClient();
  
    const mutation= useMutation<UserRead, Error, ProfileFormValues>({
      mutationFn: (profileData: ProfileFormValues) => 
        AuthService.updateProfile(userId, profileData.name, profileData.email),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: profilQueryKey(userId) });
      },
    });

    return{newProfile:mutation,errors:mutation.error}
  }

  export function useLogin() {
    const mutation= useMutation<SigninResponse,Error,LoginFormValues>({mutationFn:(credentials:LoginFormValues)=>AuthService.login(credentials.email,credentials.password)});
    return mutation;
  }

  export function useSignup() {
    const mutation= useMutation<UserRead,Error,SignupFormValues>({mutationFn:(signupForm:SignupFormValues)=>AuthService.register(signupForm.name,signupForm.email,signupForm.password)});
    return mutation;
  }


