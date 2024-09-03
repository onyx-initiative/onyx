import { ReactElement } from 'react'
import styles from '../../../styles/components/DashboardTitleRow.module.css'

type DashboardTitleRowProps = {
  title: string
  rightComponent?: ReactElement
}

export default function DashboardTitleRow({ title, rightComponent = <></> }: DashboardTitleRowProps) {
  return (
    <div className={styles.titleRow}>
      <h2 className={styles.title}>{title}</h2>
      {rightComponent}
    </div>
  )
}
