import { SelectSectionList } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export const LastUserTableBox = () => {
    const [data, setData] = useState({
        tableHead: ['Cédula', 'Email', 'Nombre y Apellido'],
        tableData: [
            // Generate random data
            ['1149457942', 'diegogarciag63diegogarciag63@gmail.com', 'Diego García'],
            ['1149457942', 'example@mail.com', 'Example Name'],
            ['1149457942', 'example@example.com', 'Example Name'],
            ['1149457942', 'diegogarciag63@gmail.com', 'Diego García'],
            ['1149457942', 'example@mail.com', 'Example Name'],
        ],
        arrWidth: [190, 190 ,190]
    })

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={data.tableHead} widthArr={data.arrWidth} style={styles.head} textStyle={styles.cellText}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {
                          data.tableData.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={data.arrWidth}
                              style={styles.cell}
                              textStyle={styles.text}
                            />
                          ))
                        }
                      </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', paddingBottom: 30, marginBottom: 16},
    head: { height: 60, backgroundColor: '#0F52BA'},
    text: { margin: 6 },
    cell: { backgroundColor: '#fff', height: 80,  },
    cellText: { margin: 6, color: '#fff'},
    dataWrapper: { marginTop: -1 },
});
