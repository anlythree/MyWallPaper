import {Button, Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {Link} from "expo-router";
import {getBingWallPapers} from "@/utils/api";
import {setState} from "jest-circus";
import {useState} from "react";
/*
*注意! 这个index.tsx的名字是不能改的，这是整个系统的入口文件，react靠这个名字来识别进入app后首先展示的页面!
* */
export default function TabOneScreen() {

    // 壁纸图片，默认undefind
    const [wallPaperImage,setWallPaperImage] = useState<undefined|string>(undefined)

    const handleGetBingImage = async ()=>{
        const arr = await getBingWallPapers()
        const url = `https://bing.com${arr[0].url}`
        console.log(url)
        setWallPaperImage(url)
    }

    const handleResetImage = async ()=>{
        console.log("置空图片")
        setWallPaperImage(undefined)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today</Text>
            <Text>今日墙纸</Text>
            {/*<Link href={'/wallpaper'}>press to Wall Paper!</Link>*/}
            {
                // 判断如果没有图片就不显示
                wallPaperImage ?
                <Image source={{uri:wallPaperImage}} style={{width:200,height:200}}/>:<View></View>
            }
            {/*  一种点击按钮打印日志的方法 */}
            <Button onPress={handleGetBingImage} title={'GetBingImage'}></Button>
            <Button onPress={handleResetImage} title={'resetImage'}></Button>
        </View>
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
