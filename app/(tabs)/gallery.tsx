import {Button, Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {FlashList} from "@shopify/flash-list";
import {useState} from "react";
import {getBingWallPapers} from "@/utils/api";
import {all} from "deepmerge";

export default function TabTwoScreen() {

    const [wallPaperList, setWallPaperList] = useState<object[]>([])

    /**
     * 获取壁纸列表
     * @param size
     */
    async function handleGetAllWallPaper(size: number) {
        const allWallPaperList = await getBingWallPapers({n: 8})
        setWallPaperList(allWallPaperList)
    }

    return (
        <View style={styles.container}>
            {/*<EditScreenInfo path="app/(tabs)/gallery.tsx" />*/}
            <Text>动态获取墙纸数据，并用FlatList显示</Text>
            <Text>通过过滤器，选择只显示收藏的壁纸，需要考虑本地储存壁纸的问题</Text>
            <Button title={'getAllWallPaper'} onPress={() => handleGetAllWallPaper(10)}/>
            {/*⚠️像有的组件类似FlashList他会要求必须要包裹在上层父元素中，比如View*/}
            <View style={{flex:1,height:'100%',width:'100%',padding:16}}>
                {/*壁纸列表*/}
                <FlashList estimatedItemSize={5}
                           data={wallPaperList}
                           renderItem={({item}) => {
                               console.log(item)
                               return(
                                   <View style={{flexDirection:'row',flex:1,margin:8}}>
                                       <Image source={{uri:`https://bing.com${item.url}`}} style={{width:100,height:50}}/>
                                       <Text>{item.title}</Text>
                                   </View>
                               )
                           }}/>
            </View>
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
