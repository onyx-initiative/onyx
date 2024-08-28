import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ANALYTICS_DASHBOARD_DATA } from '../graphql/queries/analyticsQueries'
import DashboardClickChart from '../src/components/admin/DashboardClickChart'
import Navbar from '../src/components/general/Navbar'
import styles from '../styles/Dashboard.module.css'
import DashboardTwoItemTable from '../src/components/admin/DashboardTwoItemTable'

type DashboardPageDatum = {
  date: string
  count: number
}

function Dashboard() {
  const currentDateObj = new Date()
  const currentDate = currentDateObj.toISOString().split('T')[0]
  const currentYear = currentDateObj.getFullYear()

  const [startDate, setStartDate] = useState(`${currentYear}-01-01`)
  const [endDate, setEndDate] = useState(`${currentYear}-12-31`)
  const [fetchedStartDate, setFetchedStartDate] = useState(startDate)
  const [fetchedEndDate, setFetchedEndDate] = useState(endDate)
  const [getPageData, { data: pageData, loading: pageLoading, error: pageError, called: hasPageFetchedOnce }] =
    useLazyQuery(GET_ANALYTICS_DASHBOARD_DATA, {
      onCompleted: () => {
        setFetchedStartDate(startDate)
        setFetchedEndDate(endDate)
      },
    })
  useEffect(() => {
    if (!hasPageFetchedOnce) {
      getPageData({ variables: { startDate, endDate } })
    }
  }, [endDate, getPageData, hasPageFetchedOnce, startDate])

  const types = ['Job', 'Apply', 'Employer']
  const intervals = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  const typeIntervalClickGroups = types.flatMap((type) =>
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
    console.error(pageError.message)
    return <div>error</div>
  }

  const typeClickTableBodyData = types.map((type) => {
    const dataKey = `${type.toLowerCase()}Clicks${intervals[0]}` // can be any interval since they all have same amount of total clicks
    const totalClicks = pageData[dataKey].reduce((prev: number, cur: DashboardPageDatum) => prev + cur.count, 0)
    return [type, totalClicks]
  })

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <div className={styles.titleRow}>
          <h1 className={styles.mainTitle}>
            Analytics for {fetchedStartDate} to {fetchedEndDate}
          </h1>
          <form action='' className={styles.dateLimitsForm}>
            <label className={styles.dateLimitInputContainer}>
              <span className={styles.dateLimitInputLabel}>Start Date</span>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.dateLimitInput}
                max={currentDate}
              />
            </label>
            <label className={styles.dateLimitInputContainer}>
              <span className={styles.dateLimitInputLabel}>End Date</span>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.dateLimitInput}
                min={startDate}
                max={currentDate}
              />
            </label>
            <button
              type='button'
              onClick={() => getPageData({ variables: { startDate, endDate } })}
              className={styles.dateLimitSubmit}
            >
              Get Analytics
            </button>
          </form>
        </div>
        <div className={styles.quickStats}>
          <DashboardTwoItemTable firstHeading='Click Type' secondHeading='TOTAL CLICKS' data={typeClickTableBodyData} />
        </div>
        <div>
          {typeIntervalClickGroups.map((chart) => (
            <div key={chart.dataKey} className={styles.chartContainer}>
              <DashboardClickChart data={pageData[chart.dataKey]} interval={chart.interval} type={chart.type} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Dashboard
