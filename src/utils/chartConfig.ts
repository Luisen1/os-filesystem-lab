export const chartConfig = {
  colors: ['#4A90E2', '#E94E77', '#F5A623', '#7ED321'],
  tooltip: {
    cursor: 'pointer',
    formatter: (value: number) => `${value} units`,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
    },
  },
  yAxis: {
    type: 'number',
    name: 'Count',
  },
  grid: {
    top: '20%',
    right: '5%',
    bottom: '10%',
    left: '10%',
  },
  series: [
    {
      type: 'bar',
      name: 'File Systems',
      data: [],
      itemStyle: {
        color: (params: { dataIndex: number }) => chartConfig.colors[params.dataIndex % chartConfig.colors.length],
      },
    },
  ],
};