import axios from "axios"
import { ApartmentType } from "../types/ApartmentType"
import { NewApartmentType } from "../types/NewApartmentType"

const instance = axios.create({
    baseURL: 'https://afternoon-sands-18255.herokuapp.com/api/apartments'
})

export const apartmentAPI = {
    getAllApartments() {
        return instance.get<ApartmentType[]>('', {
            params: {
                /* price: "desc",
                rooms: 2 */
            }
        }).then(res => res.data)
            .catch((e) => { throw new Error(e.response.data.message) })
    },
    getApartmentById(id: string) {
        return instance.get<ApartmentType>(`/${id}`)
            .then(res => res.data)
            .catch((e) => { throw new Error(e.response.data.message) })
    },
    addNewApartment(payload: NewApartmentType) {
        return instance.post<{ apartment: ApartmentType, message: string }>('', payload)
            .then(res => res.data)
            .catch((e) => { throw new Error(e.response.data.message) })
    },
    updateApartmentById(id: string, payload: NewApartmentType) {
        return instance.put<{ apartment: ApartmentType, message: string }>(`/${id}`, payload)
            .then(res => res.data)
            .catch((e) => { throw new Error(e.response.data.message) })
    },
    deleteApartmentById(id: string) {
        return instance.delete<{ message: string }>(`/${id}`)
            .then(res => res.data)
            .catch((e) => { throw new Error(e.response.data.message) })
    }
}