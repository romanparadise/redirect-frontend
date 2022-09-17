import { Line } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js";

function configureChart(data) {
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

  return {
    labels: labelsStrings,
    datasets: data.map((linkData, ind) => {
      return {
        label: linkData.name,
        data: discretize(linkData.clicks, intervals),
        fill: false,
        borderColor: colors[ind % colors.length],
      }
    }),
  };
}


export default function({ data }) {
  Chart.register(...registerables);

  data[0].clicks = [1663371534718, 1663371654718, 1663371774718, 1663371894718, 1663372014718, 1663372134718, 1663375134718, 1663375254718, 1663375374718, 1663375494718, 1663375614718, 1663375734718, 1663378734718, 1663378854718, 1663378974718, 1663379094718, 1663379214718, 1663379334718, 1663382334718, 1663382454718, 1663382574718, 1663382694718, 1663382814718, 1663382934718, 1663385934718, 1663386054718, 1663386174718, 1663386294718, 1663386414718, 1663386534718, 1663389534718, 1663389654718, 1663389774718, 1663389894718, 1663390014718, 1663390134718, 1663393134718, 1663393254718, 1663393374718, 1663393494718, 1663393614718, 1663393734718, 1663396734718, 1663396854718, 1663396974718, 1663397094718, 1663397214718, 1663397334718, 1663400334718, 1663400454718, 1663400574718, 1663400694718, 1663400814718, 1663400934718, 1663403934718, 1663404054718, 1663404174718, 1663404294718, 1663404414718, 1663404534718]

  return (
    <div style={{ width: '100%' }}>
      <Line 
        data={configureChart(data)}
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
    </div>
  )
}