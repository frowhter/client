import {$host} from "./index";
import {ICar} from "../types/fetchedData/cars";

export const fetchBrand = async () => {
    const {data} = await $host.get<ICar[]>(`api/brands/`)
    return data
}

export const fetchModels = async (brand: string) => {
    const {data} = await $host.get(`api/models/`, {
        params:{
            brand: brand,
        }
    })
    return data
}

export const fetchGenerations = async (model: string) => {
    const {data} = await $host.get(`api/models_info/`, {
        params:{
            model: model
        }
    })
    return data
}

export const fetchDetails = async (brand: string, model: string) => {
    const {data} = await $host.get(`api/details/`, {
        params:{
            brand: brand,
            model: model,
        }
    })
    return data
}

export const fetchProducts = async (brand: string, model: string, detail: string) => {
    const {data} = await $host.get(`api/products/`, {
        params:{
            brand: brand,
            model: model,
            detail: detail,
        }
    })
    return data
}

export const fetchVariations = async (brand: string, model: string, detail: string) => {
    const {data} = await $host.get(`api/variations/`, {
        params:{
            brand: brand,
            model: model,
            detail: detail,
        }
    })
    return data
}

export const fetchProductsRandom = async () => {
    const {data} = await $host.get(`api/products/random`)
    return data
}

export const fetchReviews = async () => {
    const {data} = await $host.get(`api/customer_reviews/`)
    return data
}




type sendMail= (
    formData: FormData
)=> any
export const sendMailSelections: sendMail = async (formData) => {
    const {data} = await $host.post(`api/mail/selection/`, formData)
    return data
}
export const sendMailCall: sendMail = async (formData) => {
    const {data} = await $host.post(`api/mail/call/`, formData)
    return data
}