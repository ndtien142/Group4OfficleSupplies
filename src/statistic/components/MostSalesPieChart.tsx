import { Stack, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const MostSalesPieChart = () => {
  const data = [
    {
      name: 'Bút chì 2B',
      sales: 300,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Vở campus',
      sales: 200,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Kẹp giấy',
      sales: 500,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Lốc giấy A4',
      sales: 400,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Khác',
      sales: 90,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <PieChart
        data={data}
        width={350}
        height={220}
        chartConfig={chartConfig}
        accessor="sales"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text style={styles.title}>Sản phẩm bán chạy</Text>
    </Stack>
  );
};

const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    color: '#000',
  },
});

export default MostSalesPieChart;
