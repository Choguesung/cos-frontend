import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AxiosResponseUserGoalsType } from '@/types/home/type';

const useGetUserGoals = (certificateId: number) => {
  const { data, error } = useSWR<AxiosResponse<AxiosResponseUserGoalsType>>(
    `/certificates/${certificateId}/goals`,
    swrGetFetcher,
  );
  return {
    userGoals: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetUserGoals;
