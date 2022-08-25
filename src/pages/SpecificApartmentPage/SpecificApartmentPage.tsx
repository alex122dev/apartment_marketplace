import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage'
import { MyButton } from '../../components/common/MyButton/MyButton'
import { Preloader } from '../../components/common/Preloader/Preloader'
import { SpecificApartment } from '../../components/SpecificApartment/SpecificApartment'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getSpecificApartments } from '../../redux/slices/actionCreators'
import { setSpecificApartment } from '../../redux/slices/apartmentSlice'
import styles from './SpecificApartmentPage.module.scss'

export const SpecificApartmentPage = () => {
    const dispatch = useAppDispatch()
    const specificApartment = useAppSelector(state => state.apartmentRD.specificApartment)
    const isFetchingSpecific = useAppSelector(state => state.apartmentRD.isFetchingSpecific)

    const { apartmentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (apartmentId) {
            dispatch(getSpecificApartments(apartmentId))
        }

        return () => {
            dispatch(setSpecificApartment(null))
        }
    }, [])


    if (isFetchingSpecific) {
        return <Preloader />
    }

    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <h2 className={styles.title}>Apartment details</h2>
                <MyButton onClick={() => navigate('/apartments')}
                    className={styles.homeBtn}
                    startColor='green'>All Apartments</MyButton>
            </div>
            {specificApartment
                ? <SpecificApartment item={specificApartment} />
                : <InfoMessage>Apartment with id: {apartmentId} not found</InfoMessage>}
        </div>
    )
}