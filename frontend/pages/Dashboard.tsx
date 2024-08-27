import { useQuery } from '@apollo/client'
import { GET_ANALYTICS_DASHBOARD_DATA } from '../graphql/queries/analyticsQueries'
import styles from '../styles/Dashboard.module.css'
import Navbar from '../src/components/general/Navbar'
import DashboardClickChart from '../src/components/admin/DashboardClickChart'

function Dashboard() {
  const { data, loading, error } = useQuery(GET_ANALYTICS_DASHBOARD_DATA, {
    variables: { startDate: '2024-01-01', endDate: '2024-08-01' },
  })

  if (loading) return <div>loading</div>
  if (error) return <div>error</div>

  const types = ['Job', 'Apply', 'Employer']
  const intervals = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  const typeIntervalClickCharts = types.flatMap((type) =>
    intervals.map((interval) => {
      return {
        type,
        interval,
        dataKey: `${type.toLowerCase()}Clicks${interval}`,
      }
    })
  )

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <div className={styles.charts}>
          {typeIntervalClickCharts.map((chart) => (
            <DashboardClickChart
              key={chart.dataKey}
              data={data[chart.dataKey]}
              interval={chart.interval}
              type={chart.type}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Dashboard
