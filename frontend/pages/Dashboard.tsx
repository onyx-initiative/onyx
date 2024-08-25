import { useQuery } from '@apollo/client'
import {
  GET_DASHBOARD_APPLY_CLICKS,
  GET_DASHBOARD_EMPLOYER_CLICKS,
  GET_DASHBOARD_JOB_CLICKS,
} from '../graphql/queries/analyticsQueries'
import { Chart } from 'react-google-charts'
import styles from '../styles/Dashboard.module.css'
import Navbar from '../src/components/general/Navbar'

function Dashboard() {
  const {
    data: jobClicks,
    loading: jobClicksLoading,
    error: jobClicksError,
  } = useQuery(GET_DASHBOARD_JOB_CLICKS, {
    variables: { startDate: '2024-01-01', endDate: '2024-08-01' },
  })
  const {
    data: applyClicks,
    loading: applyClicksLoading,
    error: applyClicksError,
  } = useQuery(GET_DASHBOARD_APPLY_CLICKS, {
    variables: { startDate: '2024-01-01', endDate: '2024-08-01' },
  })
  const {
    data: employerClicks,
    loading: employerClicksLoading,
    error: employerClicksError,
  } = useQuery(GET_DASHBOARD_EMPLOYER_CLICKS, {
    variables: { startDate: '2024-01-01', endDate: '2024-08-01' },
  })

  if (jobClicksLoading || applyClicksLoading || employerClicksLoading) return <div>loading</div>

  const dailyClickCounts = [['Date', 'Daily Count'], ...jobClicks.daily.map((item: any) => [item.date, item.count])]
  const dailyChartOptions = {
    title: 'Daily Clicks',
  }

  return (
    <>
      <Navbar />
      <main>
        <Chart chartType='Line' width='80%' height='400px' data={dailyClickCounts} options={dailyChartOptions} />
      </main>
    </>
  )
}

export default Dashboard
