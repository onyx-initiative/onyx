import styles from '../../../styles/components/Spinner.module.css'

type SpinnerProps = {
  size?: string
  thickness?: string
}

export default function Spinner({ size = '1em', thickness = '0.2em' }: SpinnerProps) {
  return <div style={{ width: size, height: size, borderWidth: thickness }} className={styles.loader} />
}
