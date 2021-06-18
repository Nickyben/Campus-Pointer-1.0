import React from 'react';
import { StyleSheet, View as _View, Text as _Text, Dimensions } from 'react-native';
import { Text } from 'react-native-svg';
import { PieChart } from 'react-native-chart-kit';
//import { PieChart } from 'react-native-svg-charts';
import { rand } from '../../constants/MyFunctions';
import Colors from '../../constants/Colors';

const Labels = ({ slices, height, width }) => {
	return slices.map((slice, index) => {
		const { labelCentroid, pieCentroid, data } = slice;
		console.log(data.length);

		return (
			<Text
				key={index}
				x={pieCentroid[0]}
				y={pieCentroid[1]}
				fill={'white'}
				textAnchor={'middle'}
				alignmentBaseline={'middle'}
				fontSize={12}
				stroke={'white'}
				strokeWidth={0.2}>
				{data.label}
			</Text>
		);
	});
};

const MyPieChart = ({ chartData, pieStyle, chartTitle }) => {
	const { pieHeight } = pieStyle ? pieStyle : {};

	//const colors = ['#55a5ff', '#f58915', '#24df90', '#ff55dd', '#ee3e11', '#7722ff', '#cc3466', '#65de27', '#a829ff'];
	//const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

	const data = chartData
		.filter((value) => value.value > 0)
		.map((area, index) => ({
			name: area.label,
			value: area.value,
			color: area.labelColor, //index < colors.length ? colors[index] : randomColor(), //rand(colors),
			legendFontColor: '#000',
			legendFontSize: 13,
			legendFontStyle: 'OpenSansBold',
		}));

	const chartConfig = {
		backgroundGradientFrom: '#1E2923',
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: '#08130D',
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 5, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional
	};
	return (
		<_View style={styles.container}>
			<_View>
				<_Text style={styles.chartTitle}>{chartTitle}</_Text>
			</_View>

			<_View style={styles.chartContainer}>
				<PieChart
					data={data}
					width={150} // from react-native
					paddingLeft={150 / 4}
					height={150}
					chartConfig={chartConfig}
					accessor="value"
					backgroundColor={'transparent'}
					style={{
						//width: '49%',
						borderRadius: 5,
						backgroundColor: '#f3f6f7',
						alignItems: 'center',
					}}
					absolute
					hasLegend={false}
				/>
				<_View
					style={{
						alignItems: 'center',
						padding: 10,
						paddingHorizontal: 20,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<_View
						style={{ flex: 1, padding: 5, paddingRight: 10, borderRightWidth: 1, borderColor: '#f3f6f7' }}>
						{data
							.filter((item, ind) => ind < data.length / 2)
							.map((item, index) => {
								return (
									<_View
										key={index}
										style={{
											flex: 1,
											alignItems: 'center',
											marginBottom: 5,
											flexDirection: 'row',
											justifyContent: 'space-around',
										}}>
										<_View style={[styles.pieIndicator, { backgroundColor: item.color }]}></_View>
										<_Text style={styles.chartText}>{item.name}</_Text>
										<_Text style={styles.chartText}>{item.value}%</_Text>
									</_View>
								);
							})}
					</_View>
					<_View style={{ flex: 1, padding: 5 }}>
						{data
							.filter((item, ind) => ind >= data.length / 2)
							.map((item, index) => {
								return (
									<_View
										key={index}
										style={{
											flex: 1,
											alignItems: 'center',
											marginBottom: 5,
											flexDirection: 'row',
											justifyContent: 'space-around',
										}}>
										<_View style={[styles.pieIndicator, { backgroundColor: item.color }]}></_View>
										<_Text style={styles.chartText}>{item.name}</_Text>
										<_Text style={styles.chartText}>{item.value}%</_Text>
									</_View>
								);
							})}
					</_View>
				</_View>
			</_View>
		</_View>
	);
};

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		//justifyContent: 'center',
	},
	pieIndicator: {
		borderRadius: 10,
		width: 20,
		height: 20,
		borderColor: '#f3f6f7',
		borderWidth: 3,
	},
	chartTitle: {
		textAlign: 'center',
		paddingBottom: 10,
		width: '100%',
		fontFamily: 'OpenSansBold',
		fontSize: 15,
		color: '#222', //Colors.primary,
		borderBottomWidth: 1,
		borderColor: '#ddd',
		marginBottom: 5,
	},
	chartText: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		marginLeft: 10,
		color: '#333',
	},
});

export default MyPieChart;

{
	/* <PieChart
        style={{ width: pieHeight ? pieHeight : '100%', }}
        valueAccessor={({ item }) => item.value}
        data={data}
        spacing={0}
        padAngle={0}
      //labelRadius={'35%'}
      >
        <Labels />
      </PieChart> */
}
