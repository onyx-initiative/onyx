import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ANALYTICS_DASHBOARD_DATA } from '../graphql/queries/analyticsQueries'
import styles from '../styles/Dashboard.module.css'
import Navbar from '../src/components/general/Navbar'
import DashboardClickChart from '../src/components/admin/DashboardClickChart'
import { useEffect, useState } from 'react'

function Dashboard() {
  const currentYear = new Date().getFullYear()
  const [startDate, setStartDate] = useState(`${currentYear}-01-01`)
  const [endDate, setEndDate] = useState(`${currentYear}-12-31`)
  const [getPageData, { data: pageData, loading: pageLoading, error: pageError, called: hasPageFetchedOnce }] =
    useLazyQuery(GET_ANALYTICS_DASHBOARD_DATA)

  useEffect(() => {
    if (!hasPageFetchedOnce) {
      getPageData({ variables: { startDate, endDate } })
    }
  }, [endDate, getPageData, hasPageFetchedOnce, startDate])

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

  if (pageLoading || !hasPageFetchedOnce) return <div>loading</div>
  if (pageError) {
    console.log(pageError.message)
    return <div>error</div>
  }
  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <form className={styles.dateLimitsForm}>
          <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button type='button' onClick={() => getPageData({ variables: { startDate, endDate } })}>
            Get Data
          </button>
        </form>
        <div className={styles.charts}>
          {typeIntervalClickCharts.map((chart) => (
            <DashboardClickChart
              key={chart.dataKey}
              data={pageData[chart.dataKey]}
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
