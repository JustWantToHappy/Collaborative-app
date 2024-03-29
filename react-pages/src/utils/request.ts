import axios from 'axios';
import { User } from '@/types';
import { LocalStorageKey} from '@/enum';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse,AxiosError,InternalAxiosRequestConfig } from 'axios';

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
            this.handleAuthorization(config);
            return config;
        }, (err: AxiosError) => {
            return Promise.reject(err.response?.data);
        });

        this.instance.interceptors.response.use((res: AxiosResponse) => {
            return res.data;
        }, (err: AxiosError) => {
            //可以在此处处理各种错误状态码
            if (err.response?.status === 401) {
                location.href='/';
                window.localStorage.removeItem(LocalStorageKey.User_Info);
            }
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

    private handleAuthorization(config: InternalAxiosRequestConfig<any>) {
        try {
            if (config.url !== '/user/login') {
                const userInfoStr=window.localStorage.getItem(LocalStorageKey.User_Info);
                const userInfo:User=JSON.parse(userInfoStr as string);
                config.headers.Authorization = `Bearer ${userInfo.jwt_token}`;
            }
        } catch (err) {
            //console.info(err);
        }
    }
}

export const request = new Request({});