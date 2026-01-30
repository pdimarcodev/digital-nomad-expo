import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import {
    useAppMutation,
    UseAppMutationOptions,
} from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { AuthUpdateProfileParams } from "../IAuthRepo";

export function useAuthUpdateProfile(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();
  const queryClient = useQueryClient();

  return useAppMutation<void, AuthUpdateProfileParams>({
    mutateFn: (params) => auth.updateProfile(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      options?.onSuccess?.();
      feedbackService.send({
        type: "success",
        message: `Profile updated successfully!`,
      });
    },
    onError: (error) => {
      console.log("error", error);
      options?.onError?.(error);
      feedbackService.send({
        type: "error",
        message: "error updating profile",
      });
    },
  });
}
