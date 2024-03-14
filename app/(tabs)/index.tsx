import {ActivityIndicator, Button, Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {Link} from "expo-router";
import {getBingWallPapers} from "@/utils/api";
import {setState} from "jest-circus";
import {useEffect, useState} from "react";
import Slider from "@react-native-community/slider";
import {number} from "prop-types";
/*
*注意! 这个index.tsx的名字是不能改的，这是整个系统的入口文件，react靠这个名字来识别进入app后首先展示的页面!
* */
export default function TabOneScreen() {

    // 壁纸图片，默认undefind
    const [wallPaperImage, setWallPaperImage] = useState<string | undefined>(undefined)
    // 请求第几天的图片
    const [wallPaperDayNum, setWallPaperDayNum] = useState<number | undefined>(1)
    // 是不是加载状态
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // 通过useEffect的方式配置初次进入页面时就加载当天的图片
    useEffect(()=>{
        handleGetBingImage()
    },[])
    /**
     * getBingImage点击动作
     */
    const handleGetBingImage = async () => {
        setIsLoading(true)
        const arr = await getBingWallPapers({n: wallPaperDayNum})
        const url = `https://bing.com${arr[0].url}`
        console.log(url)
        setWallPaperImage(url)
        setIsLoading(false)
    }

    /**
     * resetImage按钮片点击动作
     */
    const handleResetImage = async () => {
        console.log("置空图片")
        setWallPaperImage(undefined)
    }

    /**
     * slider组件变化动作
     */
    function handleSlider(value: number) {
        setWallPaperDayNum(value)
        // 自己感觉直接拖动进度条就切换图片的效果好一点
        handleGetBingImage()
    }

    /**
     * 页面排布入口
     */
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today Paper</Text>
            {/*<Link href={'/wallpaper'}>press to Wall Paper!</Link>*/}
            <View style={{height: 300, alignItems: 'center', justifyContent: 'center'}}>
                {
                    // 在loading显示loading图标，不在loading图片url为空不显示，不为空显示
                    isLoading ?
                        <ActivityIndicator/> :
                        wallPaperImage ?
                            <Image source={{uri: wallPaperImage}} style={{width: 400, height: 300}}/> : <View/>
                }
            </View>
            {/*  一种点击按钮打印日志的方法 */}
            {/*<Button onPress={handleGetBingImage} title={'GetBingImage'}></Button>*/}
            {/*因为value是从Slider组件中获取的，所以value是handleSlider的入参，所以这里的handle写法跟上边的不太一样*/}
            {/*step是步数，就是一次最少改动 disabled就是什么时候不能改动*/}
            <Slider style={{width: '60%'}} step={1} disabled={isLoading}
                    onValueChange={value => handleSlider(value)} minimumValue={1} maximumValue={8}/>
            <Text>wallPaperDayNum:{wallPaperDayNum}</Text>
            <Button onPress={handleResetImage} title={'resetImage'}></Button>
        </View>
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
