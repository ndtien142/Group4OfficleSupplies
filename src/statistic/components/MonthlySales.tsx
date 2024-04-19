import { getReportMonthly } from '@group4officesupplies/firebase/product';
import { Stack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface IDataResponse {
  id: string;
  data: string;
}

const MonthlySales = () => {
  const [reports, setReports] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    // Đặt biến loading thành true khi bắt đầu gọi dữ liệu
    setLoading(true);
    try {
      // Gọi dữ liệu từ Firebase
      const result = await getReportMonthly();
      const reportsResponse = result?.map(data => parseInt(data?.data));
      setReports(reportsResponse);
      setLoading(false);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const data = {
    labels: ['Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng bốn'],
    datasets: [
      {
        data: reports?.length > 0 ? reports : [200, 300, 200],
      },
    ],
  };

  // Effect hook để gọi hàm fetchReports khi màn hình được hiển thị
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisSuffix="đ"
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
