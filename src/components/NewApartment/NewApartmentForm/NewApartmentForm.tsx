import { Field, Form, Formik } from 'formik'
import { ApartmentType } from '../../../types/ApartmentType'
import { NewApartmentType } from '../../../types/NewApartmentType'
import * as Yup from 'yup';
import styles from './NewApartmentForm.module.scss'
import { CustomInputComponent } from '../../common/CustomInputComponent/CustomInputComponent';
import { MyButton } from '../../common/MyButton/MyButton';
import { CustomSelect } from '../../common/CustomSelect/CustomSelect';
import { CustomTextArea } from '../../common/CustomTextArea/CustomTextArea';
import { useAppSelector } from '../../../hooks/redux';
import cn from 'classnames';
import { Preloader } from '../../common/Preloader/Preloader';
import { useState } from 'react';

type PropsType = {
    item: ApartmentType | null
    submit: (values: NewApartmentType) => Promise<void>
    cancelHandle: () => void
}

export const NewApartmentForm: React.FC<PropsType> = ({ item, submit, cancelHandle }) => {
    const isFetchingSaving = useAppSelector(state => state.apartmentRD.isFetchingSaving)
    const isFetchingUpdating = useAppSelector(state => state.apartmentRD.isFetchingUpdating)

    const [formSendError, setFormSendError] = useState('')
    const [isSendSuccess, setIsSendSuccess] = useState(false)

    const formInitialValues: NewApartmentType = {
        rooms: item ? item.rooms : 1,
        name: item ? item.name : '',
        price: item ? item.price : 0,
        description: item ? item.description : '',
    }

    const roomsOptions = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ]

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={async (values, { resetForm }) => {
                try {
                    setFormSendError('')
                    await submit(values)
                    resetForm()
                    setIsSendSuccess(true)
                    setTimeout(() => {
                        setIsSendSuccess(false)
                    }, 3000);
                } catch (e: any) {
                    if (e instanceof Error) {
                        setFormSendError(e.message)
                    } else {
                        setFormSendError('error')
                    }
                }
            }}
            validationSchema={Yup.object({
                rooms: Yup.number()
                    .required('Rooms is required')
                    .min(1, 'Rooms must be more than 0'),
                price: Yup.number()
                    .required('Price is required')
                    .min(1, 'Price must be more than 0'),
                name: Yup.string()
                    .required('Name is required')
                    .max(99, 'Not more than 99 symbols'),
                description: Yup.string()
                    .max(999, 'Not more than 999 symbols'),

            })}
        >
            {({ values, setFieldValue }) => (
                <Form className={cn(styles.formBody, { [styles.editing]: item })}>
                    {(isFetchingSaving || isFetchingUpdating) && <Preloader className={styles.preloader} />}
                    {isSendSuccess && <p className={styles.sendSuccess}>The apartment was created/updated  in the system</p>}
                    {formSendError && <p className={styles.errMessage}>Try again, please. Some error occured: {formSendError}</p>}
                    <div className={styles.topBlock}>
                        <Field type='text'
                            name='name'
                            placeholder='Ex. Flat at the city center'
                            ErrorClass={styles.inputError}
                            label='Title'
                            labelClass={styles.labelInput}
                            inpError={styles.inpError}
                            className={styles.formInput}
                            blockClass={[styles.inputBlock, styles.titleBlock].join(' ')}
                            component={CustomInputComponent} />
                        <div className={styles.selectBlock}>
                            <label className={styles.labelInput}>Rooms</label>
                            <CustomSelect options={roomsOptions} selected={values.rooms}
                                setSelected={(v: string) => setFieldValue('rooms', v)} />
                        </div>
                        <Field type='number'
                            name='price'
                            value={values.price || ''}
                            placeholder='99.00'
                            ErrorClass={styles.inputError}
                            label='Price'
                            labelClass={styles.labelInput}
                            inpError={styles.inpError}
                            className={[styles.formInput, styles.inputNumberType].join(' ')}
                            blockClass={[styles.inputBlock, styles.priceBlock].join(' ')}
                            component={CustomInputComponent} />
                        <div className={styles.btnBlock}>
                            {item && <MyButton type='button' startColor='red'
                                onClick={cancelHandle}
                                className={styles.cancelBtn}>Cancel</MyButton>}
                            <MyButton type='submit' startColor='green'
                                disabled={isFetchingSaving || isFetchingUpdating}
                                className={styles.sendBtn}>Submit rent</MyButton>
                        </div>
                    </div>
                    <Field type='text'
                        name='description'
                        placeholder='Tell us about your apartment'
                        ErrorClass={styles.inputError}
                        label='Description'
                        labelClass={styles.labelInput}
                        inpError={styles.inpError}
                        className={[styles.formInput, styles.formTextarea].join(' ')}
                        blockClass={styles.inputBlock}
                        component={CustomTextArea} />
                </Form>
            )}
        </Formik >
    )
}