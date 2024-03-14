import {ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet} from 'react-native';

import {Text, View} from '@/components/Themed';
import {getBingWallPapers} from "@/utils/api";
import React, {useEffect, useState} from "react";
import {BlurView} from "expo-blur";
import {Link, Tabs} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
/*
*注意! 这个index.tsx的名字是不能改的，这是整个系统的入口文件，react靠这个名字来识别进入app后首先展示的页面!
* */
export default function TabOneScreen() {

    // 壁纸图片，默认undefind
    const [wallPaperImage, setWallPaperImage] = useState<string | undefined>(undefined)
    // 是不是加载状态
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // 通过useEffect的方式配置初次进入页面时就加载当天的图片
    useEffect(() => {
        handleGetBingImage()
    }, [])
    /**
     * getBingImage点击动作
     */
    const handleGetBingImage = async () => {
        setIsLoading(true)
        const arr = await getBingWallPapers({n: 1})
        const url = `https://bing.com${arr[0].url}`
        console.log(url)
        setWallPaperImage(url)
        setIsLoading(false)
    }

    /**
     * 页面排布入口
     */
    return (
        <>
            <Tabs.Screen
                options={{
                    // 顶部透明
                    headerTransparent:true
                }}
            />
            <View style={styles.container}>
                {
                    // 在loading显示loading图标，不在loading图片url为空不显示，不为空显示
                    isLoading ?
                        <ActivityIndicator/> :
                        <ImageBackground source={{uri: wallPaperImage}} style={{flex: 1, justifyContent: 'center'}}>
                            {/* 外边必须套一层父元素，否则报错*/}
                            {/*模糊效果，intensity是模糊程度*/}
                            <BlurView intensity={30} experimentalBlurMethod={"dimezisBlurView"}
                                      style={[StyleSheet.absoluteFillObject, {flex: 1}]}
                            />
                            <Image source={{uri: wallPaperImage}} style={{width: 400, height: 300}}/>
                        </ImageBackground>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
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
