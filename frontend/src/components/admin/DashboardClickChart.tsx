import React from 'react'
import styles from '../../../styles/components/DashboardClickChart.module.css'
import Chart from 'react-google-charts'

type ClickChartProps = {
  data: [
    {
      date: String
      count: String
    }
  ]
  interval: String
  type: String
}

export default function DashboardClickChart({ data, interval, type }: ClickChartProps) {
  const title = `${interval} ${type} Clicks`
  const clickCounts = [['Date', `${interval} ${type} Click Count`], ...data.map((item) => [item.date, item.count])]
  const chartOptions = {
    title,
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

  return (
    <div className={styles.chart}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <div className={styles.googleChartContainer}>
        <Chart chartType='AreaChart' width='100%' height='100%' data={clickCounts} options={chartOptions} />
      </div>
    </div>
  )
}