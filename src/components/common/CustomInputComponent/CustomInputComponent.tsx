import cn from 'classnames';
import { FieldProps } from 'formik';

type CustomInpPropsType = {
    ErrorClass: string,
    labelClass: string,
    blockClass: string,
    className: string,
    label: string,
    inpError: string
}

export const CustomInputComponent: React.FC<CustomInpPropsType & FieldProps> = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ErrorClass,
    labelClass,
    blockClass,
    className,
    inpError,
    label,
    ...props
}) => (
    <div className={blockClass}>
        {label && <label className={labelClass}>{label}</label>}
        <input className={cn(className, { [inpError]: errors[field.name] && touched[field.name] })} {...field} {...props} />
        {touched[field.name] &&
            errors[field.name] && <div className={ErrorClass}>{errors[field.name] as string}</div>}
    </div>
);