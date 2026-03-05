import { create } from 'zustand'
import {productApi} from "@/shared/api/client.ts";

export type Products = {
    id?: number;
    title?: string;
    brand?: string;
    sku?: string;
    rating?: number;
    price?: number;
    category?: string;
}

export type SortOrder = 'asc' | 'desc' ;

interface ProductStore {
    searchTerm: string,
    products: Products[],
    isLoading: boolean
    error: string | null
    sortField: string
    sortOrder: SortOrder


    addProduct: (newProduct: Products) => void
    setSearchTerm: (term: string) => void
    fetchProducts: () => Promise<void>
    clearSearch: () => void,
    setSorting: (field: string) => void,

}

interface ProductApiResponse {
    data: {
        total?: number;
        products?: Products[];
    }
}

export const useProductStore = create<ProductStore> ((set, get) => {
    const store = {
        searchTerm: '',
        products: [],
        isLoading: false,
        error: null,
        sortOrder: 'title',
        sortField: 'asc' as SortOrder,

        setSearchTerm: (term: string) => {
            set({searchTerm: term})
            get().fetchProducts()
        },

        fetchProducts:  async () => {
            set({isLoading: true, error: null});
            try {
                const { searchTerm, sortField, sortOrder } = get()
                const response = searchTerm ?
                    await productApi.getSearchProducts(searchTerm, sortField, sortOrder) :
                    await productApi.getSortData(sortField, sortOrder)
                set({
                    isLoading: false,
                    products: response.data.products || []
                })
            } catch(e) {
                console.log(e)
            }
        },
        clearSearch: () => {
            set({ searchTerm: '' })
            get().fetchProducts()
        },
        addProduct: (newProduct: Products) => {
            const productWithId = {
                ...newProduct,
                id: Math.round(Date.now() + Math.random()),
                rating: newProduct.rating || 0,
            }
            set((state) => ({
                products: [productWithId, ...state.products],
            }))
            console.log(productWithId)
        },
        setSorting:  (field: string) => {
            try {
                const { sortField, sortOrder } = get()
                let newOrder: SortOrder = 'asc';
                if(sortField === field) {
                    newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
                }
                set({
                    sortField: field,
                    sortOrder: newOrder
                })
                get().fetchProducts()
            } catch (e) {
                console.log(e)
            }
        }


    }
    store.fetchProducts();
    return store
})

