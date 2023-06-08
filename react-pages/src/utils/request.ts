import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse,AxiosError } from 'axios';

export interface ResponseData<T> {
    statusCode: number;
    time: string;
    data?: T;
    msg?: string;
}

class Request{
    instance: AxiosInstance;
    baseConfig: AxiosRequestConfig = {
         baseURL:'/api',
         timeout: 5000,
         withCredentials: true
    };
    
    constructor(config: AxiosRequestConfig) {
        //使用axios.create创建axios实例
        this.instance = axios.create(Object.assign(this.baseConfig, config));
        this.init();
    }

    private init() {
        this.interceptors();
    }
    //拦截器
    private interceptors() {
        this.instance.interceptors.request.use(config => {
            return config;
        }, (err: AxiosError) => {
            return Promise.reject(err.response?.data);
        });

        this.instance.interceptors.response.use((res:AxiosResponse) => {
            return res.data;
        }, (err: AxiosError) => {
            return Promise.resolve(err.response?.data);
        });
    }

    //get请求
    public get<T = any>(url:string,config?:AxiosRequestConfig):Promise<ResponseData<T>> {
        return this.instance.get(url,config);
    }
    //post请求
    public post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>{
        return this.instance.post(url,data,config);
    }
    //delete请求
    public delete<T=any>(url:string,config?:AxiosRequestConfig):Promise<ResponseData<T>> {
        return this.instance.delete(url,config);
    }
    //patch请求
    public patch<T=any>(url:string,data?: any,config?:AxiosRequestConfig):Promise<ResponseData<T>> {
        return this.instance.patch(url,data,config);
    }
}

export const request = new Request({});