import { Stack, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MonthlySales = () => {
  const data = {
    labels: ['Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng bốn'],
    datasets: [
      {
        data: [200, 450, 2800, 800],
      },
    ],
  };
  return (
    <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withVerticalLabels={true}
      />
      <Text style={styles.caption}>Doanh thu hàng tháng</Text>
    </Stack>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  caption: {
    fontSize: 14,
    marginTop: 10,
    color: '#000',
  },
});

export default MonthlySales;
