import { useEffect } from "react"
import { ApartmentsBlock } from "../../components/ApartmentsBlock/ApartmentsBlock"
import { NewApartment } from "../../components/NewApartment/NewApartment"
import { useAppDispatch } from "../../hooks/redux"
import { getAllApartments } from "../../redux/slices/actionCreators"
import styles from './HomePage.module.scss'


export const HomePage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllApartments())
    }, [])

    return (
        <>
            <h2 className={styles.title}>Apartments marketplace</h2>
            <NewApartment />
            <ApartmentsBlock />
        </>
    )
}