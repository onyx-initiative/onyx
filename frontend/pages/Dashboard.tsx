import { useQuery } from '@apollo/client'
import { GET_ANALYTICS_DASHBOARD_DATA } from '../graphql/queries/analyticsQueries'
import { Chart } from 'react-google-charts'
import styles from '../styles/Dashboard.module.css'
import Navbar from '../src/components/general/Navbar'

function Dashboard() {
  const { data, loading, error } = useQuery(GET_ANALYTICS_DASHBOARD_DATA, {
    variables: { startDate: '2024-01-01', endDate: '2024-08-01' },
  })

  if (loading) return <div>loading</div>
  if (error) return <div>error</div>

  const types = ['Job', 'Apply', 'Employer']
  const intervals = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  let clickChartsIntervals = []
  for (const type of types) {
    for (const interval of intervals) {
      const dataKey = `${type.toLowerCase()}Clicks${interval}`
      const clickCounts = [
        ['Date', `${interval} ${type} Click Count`],
        ...data[dataKey].map((item: any) => [item.date, item.count]),
      ]
      const chartOptions = {
        title: `${interval} ${type} Clicks`,
        titlePosition: 'none',
        legend: 'none',
        backgroundColor: 'transparent',
        chartArea: {
          width: '100%',
          height: '100%',
          bottom: '30',
        },
        vAxis: {
          gridlines: {
            color: '#333',
          },
          minorGridlines: {
            count: 0,
          },
          textPosition: 'in',
          textStyle: {
            color: '#999',
          },
          slantedText: false,
          maxAlternation: 1,
          format: 'short',
        },
        hAxis: {
          textPosition: 'out',
          textStyle: {
            color: '#999',
          },
          slantedText: false,
          maxAlternation: 1,
          format: 'short',
        },
        crosshair: {
          trigger: 'focus',
          color: 'white',
          orientation: 'vertical',
        },
        tooltip: {
          isHtml: true,
        },
        axisTitlesPosition: 'none',
      }
      clickChartsIntervals.push({ clickCounts, chartOptions })
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <div className={styles.charts}>
          {clickChartsIntervals.map((item: any) => (
            <div key={item.chartOptions.title} className={styles.chart}>
              <h2 className={styles.chartTitle}>{item.chartOptions.title}</h2>
              <div className={styles.googleChartContainer}>
                <Chart
                  chartType='AreaChart'
                  width='100%'
                  height='100%'
                  data={item.clickCounts}
                  options={item.chartOptions}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Dashboard
