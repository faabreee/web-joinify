import useSWRMutation from "swr/mutation";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

const instance = axios.create({ baseURL: "http://localhost:8081" });

const fetcherPost = (url: string, {arg}: {
    arg: any
}) => instance.post(url, arg).then((res) => res.data);

const fetcherGet = (url: string) => instance.get(url).then((res) => res.data);



/** EXAMPLE FETCHING TO API POST, using instance post **/
export function useSaveClientExposure(uuid: string) {
    const {
        trigger,
        isMutating
    } = useSWRMutation(`/user`, fetcherPost)

    return { trigger, isMutating };
}

/** EXAMPLE FETCHING TO API GET, using instance get **/
export function useProposalEconomicGroupDetail(uuid: string) {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWRImmutable( `/user/${uuid}`, fetcherGet, { revalidateOnMount: true });

    return {data, error, isLoading, mutate};
}
