import { ApartmentType } from '../../types/ApartmentType'
import styles from './SpecificApartment.module.scss'

type PropsType = {
    item: ApartmentType
}

export const SpecificApartment: React.FC<PropsType> = ({ item }) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{item.name}</h2>
            <div className={styles.rooms}><span>rooms:</span> {item.rooms}</div>
            <div className={styles.price}><span>price:</span> {item.price} $</div>
            <div className={styles.description}>
                <h3 className={styles.descTitle}>About Apartments</h3>
                <p className={styles.descText}>{item.description}</p>
            </div>
        </div>
    )
}