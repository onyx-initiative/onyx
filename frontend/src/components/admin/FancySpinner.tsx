import styles from '../../../styles/components/FancySpinner.module.css'

type SpinnerProps = {
  size?: number
}

export default function FancySpinner({ size = 100 }: SpinnerProps) {
  return <div style={{ width: `${size}px`, height: `${size}px` }} className={styles.loader} />
}
