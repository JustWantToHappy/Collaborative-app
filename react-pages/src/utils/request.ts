import axios from 'axios';
import { message } from 'antd';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse,AxiosError } from 'axios';

export interface ResponseData<T> {
    statusCode: number;
    data: T;
    message?: string;
    error?: string;
}

export class Request{
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
            message.error({ content: err.message, duration: 1 });
            return Promise.reject(err);
        });

        this.instance.interceptors.response.use((res:AxiosResponse) => {
            return res.data;
        }, (err: AxiosError) => {
            console.info('状态码:', err.response?.status);
            this.handleStatusCode(err.response?.status);
            return Promise.reject(err);
        });
    }

    //处理响应状态码
    private handleStatusCode(code:number|undefined) {
        switch (code) {
            case 400:
                message.error({ content: '请求错误!', duration: 1 });
                console.info('请求错误');
                break;
            case 401:
                console.info('未授权，请重新登录');
                break;
            case 403:
                message.error({content:'访问失败,权限不够!'});
                console.info('拒绝访问');
                break;
            case 404:
                message.error({ content: '你访问的资源不存在', duration: 1 });
                console.info('请求路径不存在对应的资源');
                break;
            case 500:
                message.error({ content: '出错了，请联系管理员!', duration: 1 });
                console.info('服务器错误');
                break;
                case 502:
                message.error({ content: '网络错误!', duration: 1 });
                console.info('网络错误');
                break;
            default:
                message.error({ content: '出错了，请联系管理员!', duration: 1 });
                console.info('未知错误');
                break;
        }
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