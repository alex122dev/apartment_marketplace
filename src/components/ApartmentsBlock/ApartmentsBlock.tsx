import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { ApartmentType } from '../../types/ApartmentType'
import { CustomSelect } from '../common/CustomSelect/CustomSelect'
import { InfoMessage } from '../common/InfoMessage/InfoMessage'
import { Preloader } from '../common/Preloader/Preloader'
import styles from './ApartmentsBlock.module.scss'
import { ApartmentsItem } from './ApartmentsItem/ApartmentsItem'

export const ApartmentsBlock = () => {
    const apartments = useAppSelector(state => state.apartmentRD.apartments)
    const isFetchingAll = useAppSelector(state => state.apartmentRD.isFethcingAll)
    const errorGetAll = useAppSelector(state => state.apartmentRD.errorGetAll)

    const [itemsList, setItemsList] = useState(apartments)
    const [sortType, setSortType] = useState('default')
    const [roomsCount, setRoomsCount] = useState<number | string>('')

    const sortOptions = [
        { value: 'desc', label: 'Price: highest to lowest' },
        { value: 'asc', label: 'Price: lowest to highest' },
        { value: 'default', label: 'Price: default' },
    ]

    const roomsOptions = [
        { value: '', label: 'All' },
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ]

    const sortFunction = useCallback((type: string, arr: ApartmentType[]) => {
        if (type === 'default') {
            setItemsList(arr)
        } else if (type === 'asc') {
            const sortList = [...arr].sort((a, b) => a.price - b.price)
            setItemsList(sortList)
        } else if (type === 'desc') {
            const sortList = [...arr].sort((a, b) => b.price - a.price)
            setItemsList(sortList)
        }
    }, [])

    useEffect(() => {
        if (!roomsCount) {
            sortFunction(sortType, apartments)
        } else {
            const filterList = apartments.filter(el => el.rooms === roomsCount)
            sortFunction(sortType, filterList)
        }
    }, [sortType, apartments, roomsCount])


    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <h3 className={styles.title}>Available Apartments ({itemsList.length})</h3>
                <div className={styles.roomsBlock}>
                    <span className={styles.roomsTitle}>Filter by rooms:</span>
                    <CustomSelect options={roomsOptions}
                        startPlaceholder='All' setSelected={setRoomsCount} selected={roomsCount} />
                </div>
                <div className={styles.sortBlock}>
                    <span className={styles.sortTitle}>Sort by:</span>
                    <CustomSelect options={sortOptions}
                        className={styles.sortSelect}
                        setSelected={setSortType} selected={sortType} />
                </div>
            </div>
            {isFetchingAll && <Preloader />}
            {errorGetAll && <InfoMessage>{errorGetAll}</InfoMessage>}
            <ul className={styles.list}>
                {itemsList.map(el => <li key={el.id}>
                    <ApartmentsItem item={el} />
                </li>)}
            </ul>
        </div>
    )
}