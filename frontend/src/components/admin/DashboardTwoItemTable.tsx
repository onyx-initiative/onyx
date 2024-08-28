import styles from '../../../styles/components/DashboardTwoItemTable.module.css'

type DashboardTwoItemTableProps = {
  firstHeading: string
  secondHeading: string
  data: Array<Array<string>>
}

export default function DashboardTwoItemTable({ firstHeading, secondHeading, data }: DashboardTwoItemTableProps) {
  return (
    <div className={styles.dataTable}>
      <table>
        <thead>
          <tr>
            <th>{firstHeading}</th>
            <th>{secondHeading}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
