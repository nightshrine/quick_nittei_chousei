import axios, { type AxiosResponse } from 'axios';
import { GetEnvService } from './GetEnvService';

/**
 * APIに関する処理を行う
 */
export class ApiService {
    /**
     * GET APIを実行
     */
    public static async callGetApi<T>(url: string): Promise<T> {
        return axios
            .get(GetEnvService.getBaseApiUrl() + url)
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    /**
     * POST APIを実行
     */
    public static async callPostApi<T>(url: string, data: T): Promise<void> {
        return axios
            .post(GetEnvService.getBaseApiUrl() + url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response: AxiosResponse<void>) => {
                console.log(response);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    /**
     * PUT APIを実行
     */
    public static async callPutApi<T>(url: string, data: T): Promise<void> {
        return axios
            .put(GetEnvService.getBaseApiUrl() + url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response: AxiosResponse<void>) => {
                console.log(response);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}
