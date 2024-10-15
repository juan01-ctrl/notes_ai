import { STALE_TIME } from "@/app/providers";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getNotes } from "../service";


const queryKey = ['notes']

export const useGetNotes = ({
  params
}: Parameters<typeof getNotes>[0]) => useQuery({
    queryKey,
    queryFn: () => getNotes({ params }),
    staleTime: STALE_TIME.TEN_MINUTES,
    retry: 3
})


export const refetchNotes = (queryClient: QueryClient) => {
    queryClient.refetchQueries({
    queryKey
})
}