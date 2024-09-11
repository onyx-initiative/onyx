import { MouseEventHandler, ReactNode } from 'react'
import styles from '../../../styles/components/DashboardDateLimitComponents.module.css'
import Spinner from './Spinner'

type DashboardDateLimitSubmitProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  loading: boolean
  children: ReactNode
  [extraProps: string]: any
}

export default function DashboardDateLimitSubmit({
  onClick,
  loading,
  children,
  ...extraProps
}: DashboardDateLimitSubmitProps) {
  return (
    <button {...extraProps} type='button' onClick={onClick} className={styles.dateLimitSubmit}>
      {loading ? <Spinner /> : children}
    </button>
  )
}
