import cn from 'classnames'
import styles from './MyButton.module.scss'

type PropsType = {
    startColor: 'green' | 'blue' | 'red'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const MyButton: React.FC<PropsType> = ({ startColor, className, children, ...props }) => {
    return (
        <button type='button' {...props} className={cn(styles.btn, {
            [className as string]: className,
            [styles.green]: startColor === 'green',
            [styles.blue]: startColor === 'blue',
            [styles.red]: startColor === 'red',
        })
        }>
            {children}
        </button>
    )
}