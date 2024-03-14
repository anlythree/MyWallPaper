import {Button, Image, StyleSheet} from 'react-native';

import {Text, View} from '@/components/Themed';
import {FlashList} from "@shopify/flash-list";
import {useState} from "react";
import {getBingWallPapers} from "@/utils/api";
import React from 'react';
import {Tabs} from 'expo-router';
import {Pressable} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default function TabTwoScreen() {

    const [wallPaperList, setWallPaperList] = useState([])

    /**
     * 获取壁纸列表
     * @param size
     */
    async function handleGetAllWallPaper(size: number) {
        const allWallPaperList = await getBingWallPapers({n: 8})
        setWallPaperList(allWallPaperList)
    }

    return (
        <>
            <Tabs.Screen
                options={{
                    // 重新定义一遍index页面右上角的图标
                    headerRight: () => (
                        <Pressable onPress={() => handleGetAllWallPaper(10)}>
                            {({pressed}) => (
                                <FontAwesome
                                    name="refresh"
                                    size={25}
                                    color={'gray'}
                                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                />
                            )}
                        </Pressable>
                    ),
                }}
            />
            <View style={styles.container}>
                <View style={{flex: 1, height: '100%', width: '100%', padding: 16}}>
                    {/*壁纸列表*/}
                    <FlashList estimatedItemSize={5}
                        // 配置不显示滚动条，不好看
                               showsVerticalScrollIndicator={false}
                               data={wallPaperList}
                        // 直接写item不影响运行，但是这里的范性会影响下边的item.属性代码爆红，这里更好的写法是定义对象中的属性，暂时先这样处理
                               renderItem={({item}: { item: any }) => {
                                   console.log(item)
                                   return (
                                       <View style={{flexDirection: 'row', flex: 1, margin: 8}}>
                                           <Image source={{uri: `https://bing.com${item.url}`}}
                                                  style={{width: 100, height: 100}}/>
                                           <View>
                                               <Text style={{fontSize: 25}}>{item.title}</Text>
                                               <Text style={{fontSize: 15}}>{item.copyright}</Text>
                                           </View>
                                       </View>
                                   )
                               }}/>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
