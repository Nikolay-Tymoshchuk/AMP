import axios from 'axios';

import { NEXTAPI_URL } from '@/config';

const baseApi = axios.create({
  baseURL: NEXTAPI_URL,
});

export default baseApi;
