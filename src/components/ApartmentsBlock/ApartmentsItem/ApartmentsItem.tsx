import cn from 'classnames'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { deleteApartment } from '../../../redux/slices/actionCreators'
import { setEditableApartment } from '../../../redux/slices/apartmentSlice'
import { ApartmentType } from '../../../types/ApartmentType'
import { MyButton } from '../../common/MyButton/MyButton'
import styles from './ApartmentsItem.module.scss'


type PropsType = {
    item: ApartmentType
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ApartmentsItem: React.FC<PropsType> = ({ item }) => {
    const dispatch = useAppDispatch()
    const editableApartment = useAppSelector(state => state.apartmentRD.editableApartment)
    const inDeletingProccess = useAppSelector(state => state.apartmentRD.inDeletingProccess)
    const editing = editableApartment?.id === item.id

    const navigate = useNavigate()

    const getDetails = () => {
        navigate(`/apartments/${item.id}`)
    }

    const editHandle = (e: MouseEvent) => {
        e.stopPropagation()
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        dispatch(setEditableApartment(item.id))
    }

    const deleteHandle = (e: MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteApartment(item.id))
    }

    return (
        <div onClick={getDetails} className={cn(styles.body, { [styles.editing]: editing })}>
            <div className={styles.textBlock}>
                <span className={[styles.name, styles.textItem].join(' ')}>
                    {item.name}</span>
                <span className={[styles.rooms, styles.textItem].join(' ')}>
                    rooms: {item.rooms}</span>
                <span className={[styles.price, styles.textItem].join(' ')}>
                    ${item.price}</span>
                <p className={[styles.description, styles.textItem].join(' ')}>
                    {item.description}</p>
            </div>
            <div className={styles.btnBlock}>
                <MyButton onClick={editHandle}
                    disabled={inDeletingProccess.some(el => el === item.id)}
                    startColor='blue'>{editing ? 'Editing' : 'Edit'}</MyButton>
                <MyButton onClick={deleteHandle}
                    disabled={inDeletingProccess.some(el => el === item.id)}
                    startColor='red'>Delete</MyButton>
            </div>
        </div>
    )
}