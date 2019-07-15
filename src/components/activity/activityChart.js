// Dependencies
import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'
  
function ActivityChart(props) {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const contentInset = { top: 20, bottom: 20 }

    return (
        <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
                data={data}
                contentInset={contentInset}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
            />
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={data}
                svg={{ stroke: '#00aeef' }}
                contentInset={contentInset}
            >
                <Grid/>
            </LineChart>
        </View>
    )
}

export default ActivityChart