import axios from "axios";
import useSWRImmutable from "swr/immutable";


const HOST_API_VIO_AUTHORA = process.env.NEXT_PUBLIC_HOST_API_AUTHORA;
const axiosInstance = axios.create({ baseURL: HOST_API_VIO_AUTHORA });

const fetcherGetOauth2 = (url: string) => axiosInstance.post(url).then((res) => res.data);





