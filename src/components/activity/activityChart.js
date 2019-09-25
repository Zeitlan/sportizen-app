// Dependencies
import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'
  
function ActivityChart(props) {
    const data = props.data.graph.map((e) => e.speed * 1000)
    console.log(data)
    const contentInset = { top: 40, bottom: 0 }

    return (
        <View style={{ height: 150, flexDirection: 'row' }}>
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