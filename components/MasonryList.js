import { StyleSheet, Text, View, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pins from '../components/Pins'

const MasonryList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const numRows = 2;
    return (
        <ScrollView
            style={{ marginTop: -25 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={props.onRefresh}
                />}
        >
            <View style={{ flexDirection: 'row', marginTop: 11 }}>

                {
                    Array.from(Array(numRows)).map((col, colIndex) => (
                        <View style={{ flex: 1 }} key={`column_${colIndex}`}>
                            {props.pins
                                .filter((item, index) => index % numRows === colIndex)
                                .map((pin) => (
                                    <Pins pins={pin} />
                                ))}
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default MasonryList

const styles = StyleSheet.create({})