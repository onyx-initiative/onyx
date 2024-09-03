import React, { useEffect, useState } from 'react'
import styles from '../../../styles/components/DashboardClickChart.module.css'
import Chart from 'react-google-charts'
import Image from 'next/image'

type ClickChartProps = {
  data: [
    {
      date: string
      count: number
    }
  ]
  interval: string
  type: string
}

export default function DashboardClickChart({ data, interval, type }: ClickChartProps) {
  const title = `${interval} ${type} Clicks`
  const clickCounts = [['Date', `${interval} ${type} Click Count`], ...data.map((item) => [item.date, item.count])]
  const chartOptions = {
    title,
    titlePosition: 'none',
    legend: 'none',
    backgroundColor: 'transparent',
    pointSize: 6,
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

  // Get chart PNG for printing
  const [chartWrapper, setChartWrapper] = useState<any>(null)
  const [chartImageURI, setChartImageURI] = useState('')
  useEffect(() => {
    if (chartWrapper !== null) {
      setChartImageURI(chartWrapper.getChart().getImageURI())
    }
  }, [chartWrapper])

  return (
    <>
      <div className={styles.chart}>
        <div className={styles.chartTitle}>{title}</div>
        {data.length ? (
          <>
            <div className={styles.googleChartContainer}>
              <Chart
                chartType='AreaChart'
                width='100%'
                height='100%'
                data={clickCounts}
                options={chartOptions}
                getChartWrapper={(wrapper) => setChartWrapper(wrapper)}
              />
            </div>
            <div className={styles.chartImageContainer}>
              <Image src={chartImageURI} alt={`${title} Chart`} layout='fill' />
            </div>
          </>
        ) : (
          <div className={styles.noDataMessage}>No data</div>
        )}
      </div>
    </>
  )
}
