import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js";
import Switch from '@mui/material/Switch';
import './styles.css'

function configureChart(data, showUniqueChartColors) {
  const colors = [
    'rgb(75,192,192)', 
    'rgb(116, 39, 116)', 
    'rgb(205, 97, 85)', 
    '#F1948A', 
    '#C39BD3', 
    '#A569BD', 
    '#5499C7', 
    '#85C1E9', 
    '#76D7C4', 
    '#7DCEA0',
    '#82E0AA',
    '#F4D03F',
    '#FCF3CF',
    '#F8C471',
    '#EB984E',
    '#EDBB99',
    '#ECF0F1',
  ]
  function roundToNearestHour(date) {
    if (typeof date === 'number') {
      date = new Date(date)
    }
    date.setMinutes(date.getMinutes() + 30);
    date.setMinutes(0, 0, 0);
  
    return date;
  }
  function discretize(values, intervals) {
    return intervals.map(interval => {
      return values.filter(v => v > interval.from && v <= interval.to).length
    })
  }
  function shadeHexColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  const discretizeInterval = 60 * 60 * 1000
  const period = 24 * 60 * 60 * 1000
  const nowTime = Date.now()
  const startPeriod = nowTime - period
  const endPeriod = nowTime

  let labels = [new Date(nowTime)]
  for (let i = 0; i < 23; i++) {
    const nextLabelHour = labels[0].getHours() - 1
    labels.unshift(new Date())
    labels[0].setHours(nextLabelHour)
  }

  const intervals = [{
    from: labels[0].getTime() - discretizeInterval,
    to: labels[0].getTime(),
  }]
  for (let i = 1; i < labels.length; i++) {
    intervals.push({
      from: labels[i - 1].getTime(),
      to: labels[i].getTime(),
    })
  }

  const labelsStrings = labels.map(l => `${l.getHours()}:${l.getMinutes()}`)

  let defaultColorToUseInd = 0
  //const usedCustomColors = new Set()

  return {
    labels: labelsStrings,
    datasets: data.map((linkData, ind) => {
      let color = null
      if (showUniqueChartColors) {
        color = colors[ind % colors.length]
      } else {
        color = linkData.tags.find(t => t.startsWith('#')) 
        if (color) {
          // if (usedCustomColors.has(color)) {
          //   color = shadeHexColor(color, (Math.random() - 0.5)*1.5)
          // } else {
          //   usedCustomColors.add(color)
          // }
        } else {
          color = colors[defaultColorToUseInd]
          defaultColorToUseInd = (defaultColorToUseInd + 1) % colors.length
        }
      }

      return {
        label: linkData.name,
        data: discretize(linkData.clicks, intervals),
        fill: false,
        borderColor: color,
      }
    }),
  };
}

export default function({ data }) {
  const [ showUniqueChartColors, setShowUniqueChartColors] = useState(false)
  const memoizationDeps = [data.map(i => i.clicks).join(' '), showUniqueChartColors, new Date().getMinutes()]
  const chartData = useMemo(() => {
    return configureChart(data, showUniqueChartColors)
  }, [...memoizationDeps])

  Chart.register(...registerables);

  if (!data?.length) return

  return (
    <div style={{ width: '100%' }}>
      <Line 
        data={chartData}
        options={{
          scales: {
            y: {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
            },
          },
        }}
      />
      <div className='colors-switch'>
        <Switch defaultChecked={showUniqueChartColors} onChange={e => setShowUniqueChartColors(e.target.checked)} />
        <span>Сделать разные цвета для графиков</span>
      </div>
    </div>
  )
}