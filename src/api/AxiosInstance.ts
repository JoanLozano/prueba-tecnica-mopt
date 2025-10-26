import axios, { AxiosInstance as Instance, } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_URL_API || 'https://api.example.com';

const AxiosInstance = (): Instance => {
    const instance = axios.create({
        baseURL:  BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000,
    });

    instance.interceptors.request.use((config) => {
        let token: string | null = null
        if (typeof window !== 'undefined' && window.sessionStorage) {
            token = window.sessionStorage.getItem('token')
        }

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            } as typeof config.headers;
        }
        return config;
    });

    // Add a response interceptor to handle 401 errors
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    try {
                        window.sessionStorage.clear();
                        window.localStorage.clear();
                        if (typeof window.alert === 'function') {
                            window.alert('Session expired. Please log in again.');
                        }
                    } catch (e) {
                        console.warn('Could not clear storage or show alert:', e);
                    }
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default AxiosInstance;
