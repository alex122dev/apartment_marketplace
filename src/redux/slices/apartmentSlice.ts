import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApartmentType } from "../../types/ApartmentType";
import { NewApartmentType } from "../../types/NewApartmentType";


type initialStateType = {
    apartments: ApartmentType[]
    specificApartment: null | ApartmentType
    editableApartment: null | ApartmentType
    isFethcingAll: boolean
    errorGetAll: string
    isFetchingSaving: boolean
    isFetchingUpdating: boolean
    inDeletingProccess: string[],
    isFetchingSpecific: boolean
}

const initialState: initialStateType = {
    apartments: [],
    specificApartment: null,
    editableApartment: null,
    isFethcingAll: false,
    errorGetAll: '',
    isFetchingSaving: false,
    isFetchingUpdating: false,
    inDeletingProccess: [],
    isFetchingSpecific: false
}

export const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setApartments: (state, action: PayloadAction<ApartmentType[]>) => {
            state.apartments = action.payload
        },
        setSpecificApartment: (state, action: PayloadAction<ApartmentType | null>) => {
            state.specificApartment = action.payload
        },
        setEditableApartment: (state, action: PayloadAction<string | null>) => {
            state.editableApartment = state.apartments.find(el => el.id === action.payload) || null
        },
        addNewApartment: (state, action: PayloadAction<ApartmentType>) => {
            state.apartments.push(action.payload)
        },
        setUpdateApartment: (state, action: PayloadAction<{ id: string, payload: NewApartmentType }>) => {
            const findApartment = state.apartments.find(el => el.id === action.payload.id)
            if (findApartment) {
                findApartment.description = action.payload.payload.description
                findApartment.name = action.payload.payload.name
                findApartment.price = action.payload.payload.price
                findApartment.rooms = action.payload.payload.rooms
            }
        },
        deleteApartmentById: (state, action: PayloadAction<string>) => {
            state.apartments = state.apartments.filter(el => el.id !== action.payload)
        },
        setIsFethcingAll: (state, action: PayloadAction<boolean>) => {
            state.isFethcingAll = action.payload
        },
        setErrorGetAll: (state, action: PayloadAction<string>) => {
            state.errorGetAll = action.payload
        },
        setIsFetchingSaving: (state, action: PayloadAction<boolean>) => {
            state.isFetchingSaving = action.payload
        },
        setIsFetchingUpdating: (state, action: PayloadAction<boolean>) => {
            state.isFetchingUpdating = action.payload
        },
        setInDeletingProccess: (state, action: PayloadAction<{ isFetching: boolean, id: string }>) => {
            action.payload.isFetching
                ? state.inDeletingProccess.push(action.payload.id)
                : state.inDeletingProccess = state.inDeletingProccess.filter(el => el !== action.payload.id)
        },
        setIsFetchingSpecific: (state, action: PayloadAction<boolean>) => {
            state.isFetchingSpecific = action.payload
        },
    }
})

export const { setApartments, setSpecificApartment, setEditableApartment, addNewApartment,
    deleteApartmentById, setIsFethcingAll, setErrorGetAll, setUpdateApartment, setIsFetchingSaving,
    setIsFetchingUpdating, setInDeletingProccess, setIsFetchingSpecific } = apartmentsSlice.actions

export const apartmentReducer = apartmentsSlice.reducer