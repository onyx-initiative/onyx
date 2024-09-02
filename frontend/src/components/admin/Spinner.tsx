import styles from '../../../styles/components/Spinner.module.css'

type SpinnerProps = {
  size?: number
  thickness?: number
}

export default function Spinner({ size = 80, thickness = 6 }: SpinnerProps) {
  return (
    <div style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${thickness}px` }} className={styles.loader} />
  )
}
