import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { saveNewApartment, updateApartment } from '../../redux/slices/actionCreators'
import { setEditableApartment } from '../../redux/slices/apartmentSlice'
import { NewApartmentType } from '../../types/NewApartmentType'
import styles from './NewApartment.module.scss'
import { NewApartmentForm } from './NewApartmentForm/NewApartmentForm'

export const NewApartment = () => {

    const dispatch = useAppDispatch()
    const editableApartment = useAppSelector(state => state.apartmentRD.editableApartment)

    const submit = async (payload: NewApartmentType) => {
        editableApartment
            ? await dispatch(updateApartment(editableApartment.id, payload))
            : await dispatch(saveNewApartment(payload))
    }

    const cancel = () => {
        dispatch(setEditableApartment(null))
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{editableApartment ? 'Editing' : 'Create a new rent'}</h3>
            <NewApartmentForm submit={submit} item={editableApartment} cancelHandle={cancel} />
        </div>
    )
}