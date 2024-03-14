import {Button, Image, StyleSheet} from 'react-native';

import {Text, View} from '@/components/Themed';
import {FlashList} from "@shopify/flash-list";
import {useEffect, useState} from "react";
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
        const allWallPaperList = await getBingWallPapers({n: size})
        setWallPaperList(allWallPaperList)
    }

    // 通过useEffect的方式配置初次进入页面时就加载壁纸列表
    useEffect(() => {
        handleGetAllWallPaper(8)
    }, [])

    return (
        <>
            <Tabs.Screen
                options={{
                    // 重新定义一遍index页面右上角的图标
                    headerRight: () => (
                        <Pressable onPress={() => handleGetAllWallPaper(8)}>
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
                                       <View style={{flexDirection: 'row', flex: 1, margin: 8, gap: 20}}>
                                           <Image source={{uri: `https://bing.com${item.url}`}}
                                               // borderRadius是加圆角的，如果要在view上加圆角还要加overflow:hide,让超出部分隐藏掉
                                                  style={{width: 100, height: 100, borderRadius: 8,}}/>
                                           {/*不加flex:1的话文字会被屏幕边缘截取掉，这种方式比直接在Text上限定width要灵活一点*/}
                                           <View style={{flex: 1}}>
                                               {/*numberOfLines可以限定行数，防止影响整个页面的显示效果*/}
                                               <Text numberOfLines={2} style={{fontSize: 20}}>{item.title}</Text>
                                               <Text numberOfLines={3} style={{fontSize: 15}}>{item.copyright}</Text>
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
