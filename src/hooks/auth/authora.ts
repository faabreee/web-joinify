import axios from "axios";
import useSWRImmutable from "swr/immutable";

const HOST_API_VIO_AUTHORA = process.env.NEXT_PUBLIC_HOST_API_AUTHORA;
const axiosInstance = axios.create({ baseURL: HOST_API_VIO_AUTHORA });

const fetcherPost = (url: string, token: string) => {
    axiosInstance.post(url, new URLSearchParams(
        { token }).toString(), 
        { headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic ZGVtby1jbGllbnQ6c2VjcmV0"
        }}
    ).then((res) => res.data);
}

export function useAuthoraLogin(token: string) {

    const { 
        data, 
        error, 
        isLoading 
    } = useSWRImmutable(
        ["/oauth2/introspect", token],
        ([url, token]) => fetcherPost(url, token),
        {
            revalidateOnMount: true
        }
      );

    return { data, error, isLoading };
}



