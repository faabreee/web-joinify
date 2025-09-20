import useSWRMutation from "swr/mutation";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

const HOST_API_VIO_BACKBONE = process.env.NEXT_PUBLIC_HOST_API_VIO_BACKBONE;
const axiosInstance = axios.create({ baseURL: HOST_API_VIO_BACKBONE });

const fetcherGet = (url: string) => axiosInstance.get(url).then((res) => res.data);
const fetcherPost = (url: string, {arg}: { arg: any }) => axiosInstance.post(url, arg).then((res) => res.data);
const fetcherPut = (url: string, {arg}: { arg: any }) => axiosInstance.put(url, arg).then((res) => res.data);

export function useAuthLogin() {
    const {
        trigger,
        isMutating,
    } = useSWRMutation(`/auth/login`, fetcherPost);

    return { trigger, isMutating };
}

export function useAuthRegister() {
    const {
        trigger,
        isMutating,
    } = useSWRMutation(`/auth/register`, fetcherPost);

    return { trigger, isMutating };
}

export function useAuthLogout() {
    const {
        trigger,
        isMutating,
    } = useSWRMutation(`/auth/logout`, fetcherPost);

    return { trigger, isMutating };
}



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
