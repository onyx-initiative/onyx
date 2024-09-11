import styles from '../../../styles/components/DashboardDateLimitComponents.module.css'

type DashboardDateLimitInputProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  [extraProps: string]: any
}

export default function DashboardDateLimitInput({
  label,
  value,
  onChange,
  ...extraProps
}: DashboardDateLimitInputProps) {
  return (
    <label className={styles.dateLimitInputContainer}>
      <span className={styles.dateLimitInputLabel}>{label}</span>
      <input {...extraProps} type='date' value={value} onChange={onChange} className={styles.dateLimitInput} />
    </label>
  )
}
