import axios, {type AxiosResponse} from 'axios'
import type { Products } from "@/store/useProductStore.ts";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

export interface ApiData {
    products: Products[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductApiResponse extends AxiosResponse<ApiData> {}

export const productApi = {
    getAllProducts: async (): Promise<ProductApiResponse> => {
        try {
            const response: AxiosResponse<ApiData> = await axiosInstance.get('/')
            return response
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    getSearchProducts: async (searchQuery: string, sortBy: string, order: 'asc' | 'desc' = 'asc' ): Promise<ProductApiResponse> => {
        try {
            const response: AxiosResponse<ApiData> = await axiosInstance.get('/search', {
                params: {
                    q: searchQuery,
                    sortBy: sortBy,
                    order: order
                }
            })
            return response
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    getSortData: async (sortBy: string, order: 'asc' | 'desc' = 'asc'): Promise<ProductApiResponse> => {
        try {
            const response: AxiosResponse<ApiData> = await axiosInstance.get(`/`, {
                params: {
                    sortBy: sortBy,
                    order: order
                }
            })
            return response
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}