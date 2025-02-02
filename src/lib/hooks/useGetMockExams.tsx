import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamsByYearResponseType } from '@/types/community/type';

const useGetMockExams = (certificateId: number, year: number | string | undefined) => {
  const { data, error } = useSWR<MockExamsByYearResponseType>(
    `/certificates/${certificateId}/mock-exams?${year === '전체' ? '' : `examYear=${year}`}`,
    swrGetFetcher,
  );

  return {
    mockExams: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExams;
