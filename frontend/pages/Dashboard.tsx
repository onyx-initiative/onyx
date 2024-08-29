import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ANALYTICS_DASHBOARD_DATA } from '../graphql/queries/analyticsQueries'
import DashboardClickChart from '../src/components/admin/DashboardClickChart'
import Navbar from '../src/components/general/Navbar'
import styles from '../styles/Dashboard.module.css'
import DashboardTwoItemTable from '../src/components/admin/DashboardTwoItemTable'

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

  if (pageLoading || !hasPageFetchedOnce) return <div>loading</div>
  if (pageError) {
    console.error(pageError.message)
    return <div>error</div>
  }

  const scholarsByMajor: [{ major: string; scholar_count: string }] = pageData['scholarsRankedByMajor']
  const scholarsByMajorTableBodyData = scholarsByMajor.map((ranking) => [ranking.major, ranking.scholar_count])

  const jobTagRankings: [{ tag: string; job_count: string }] = pageData['jobTagRankings']
  const jobTagRankingsTableBodyData = jobTagRankings.map((ranking) => [ranking.tag, ranking.job_count])

  const jobTagsByClicks: [{ tag: string; click_count: string }] = pageData['jobTagRankingsByClicks']
  const jobTagsByClicksTableBodyData = jobTagsByClicks.map((ranking) => [ranking.tag, ranking.click_count])

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

  const typeClickTableBodyData = types.map((type) => {
    const dataKey = `${type.toLowerCase()}Clicks${intervals[0]}` // can be any interval since they all have same amount of total clicks
    const totalClicks = pageData[dataKey].reduce(
      (
        prev: number,
        cur: {
          date: string
          count: number
        }
      ) => prev + cur.count,
      0
    )
    return [type, totalClicks]
  })

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <div className={styles.titleRow}>
          <h2 className={styles.mainTitle}>Scholar and Job Counts</h2>
        </div>
        <div className={styles.quickStats}>
          <DashboardTwoItemTable firstHeading='MAJOR' secondHeading='SCHOLARS' data={scholarsByMajorTableBodyData} />
          <DashboardTwoItemTable firstHeading='JOB TAG' secondHeading='JOBS' data={jobTagRankingsTableBodyData} />
        </div>
        <div className={styles.titleRow}>
          <h2 className={styles.mainTitle}>
            Click Counts from {fetchedStartDate} to {fetchedEndDate}
          </h2>
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
              Get Clicks
            </button>
          </form>
        </div>
        <div className={styles.quickStats}>
          <DashboardTwoItemTable firstHeading='CLICK TYPE' secondHeading='CLICKS' data={typeClickTableBodyData} />
          <DashboardTwoItemTable firstHeading='JOB TAG' secondHeading='CLICKS' data={jobTagsByClicksTableBodyData} />
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
