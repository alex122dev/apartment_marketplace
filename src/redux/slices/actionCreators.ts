import { apartmentAPI } from "../../api/api";
import { NewApartmentType } from "../../types/NewApartmentType";
import { AppDispatch } from "../store";
import {
    addNewApartment, deleteApartmentById, setApartments, setEditableApartment, setErrorGetAll,
    setInDeletingProccess, setIsFetchingSaving, setIsFetchingSpecific, setIsFetchingUpdating,
    setIsFethcingAll, setSpecificApartment, setUpdateApartment
} from "./apartmentSlice";


export const getAllApartments = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setErrorGetAll(''))
        dispatch(setIsFethcingAll(true))
        const apartments = await apartmentAPI.getAllApartments()
        dispatch(setApartments(apartments))
        dispatch(setIsFethcingAll(false))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(setErrorGetAll(e.message))
        } else {
            dispatch(setErrorGetAll('Some error occured'))
        }
        dispatch(setIsFethcingAll(false))
    }
}

export const getSpecificApartments = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsFetchingSpecific(true))
        const apartment = await apartmentAPI.getApartmentById(id)
        dispatch(setSpecificApartment(apartment))
        dispatch(setIsFetchingSpecific(false))
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        } else {
            console.log('Some error occured');
        }
        dispatch(setIsFetchingSpecific(false))
    }
}

export const saveNewApartment = (payload: NewApartmentType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsFetchingSaving(true))
        const data = await apartmentAPI.addNewApartment(payload)
        dispatch(addNewApartment(data.apartment))
        dispatch(setIsFetchingSaving(false))
    } catch (e) {
        dispatch(setIsFetchingSaving(false))
        throw e
    }
}

export const updateApartment = (id: string, payload: NewApartmentType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsFetchingUpdating(true))
        await apartmentAPI.updateApartmentById(id, payload)
        dispatch(setUpdateApartment({ id, payload }))
        dispatch(setEditableApartment(null))
        dispatch(setIsFetchingUpdating(false))
    } catch (e) {
        dispatch(setIsFetchingUpdating(false))
        throw e
    }
}

export const deleteApartment = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setInDeletingProccess({ isFetching: true, id }))
        await apartmentAPI.deleteApartmentById(id)
        dispatch(deleteApartmentById(id))
        dispatch(setInDeletingProccess({ isFetching: false, id }))
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        } else {
            console.log('Some error occured');
        }
        dispatch(setInDeletingProccess({ isFetching: false, id }))
    }
}