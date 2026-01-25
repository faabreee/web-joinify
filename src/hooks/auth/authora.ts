import axios from "axios";
import useSWRMutation from "swr/mutation";

const HOST_API_VIO_AUTHORA = process.env.NEXT_PUBLIC_HOST_API_AUTHORA;
const axiosInstance = axios.create({ baseURL: HOST_API_VIO_AUTHORA });

const tokenFetcher = async (url: string, { arg }: { arg: { code: string } }) => {
    const response = await axiosInstance.post(url, new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "demo-client",
        client_secret: "secret",
        redirect_uri: "http://localhost:3000/authentication/login",
        code: arg.code
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa("demo-client:secret"),
        },
    });
    return response.data;
}

export function useAuthoraLoginv2() {
    const {
      trigger,
      isMutating,
    } = useSWRMutation('/oauth2/token', tokenFetcher);
  
    return { trigger, isMutating };
}
