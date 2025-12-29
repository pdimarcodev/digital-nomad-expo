import { useState } from "react";

type UseAppMutationReturn<DataT, ParamsT> = {
  mutate: (params: ParamsT) => Promise<void>;
  data?: DataT;
  isLoading: boolean;
  error: unknown;
};

export function useAppMutation<DataT, ParamsT>(
  mutationFn: (params: ParamsT) => Promise<DataT>
): UseAppMutationReturn<DataT, ParamsT> {
  const [data, setData] = useState<DataT>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function mutate(params: ParamsT) {
    try {
      setIsLoading(true);
      setError(null);
      const result = await mutationFn(params);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    mutate,
    data,
    isLoading,
    error,
  };
}
