import {Button, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {Link} from "expo-router";
/*
*注意! 这个index.tsx的名字是不能改的，这是整个系统的入口文件，react靠这个名字来识别进入app后首先展示的页面!
* */
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {/*  一种点击按钮打印日志的方法 */}
      <Button onPress={()=>console.log('------>')} title={'testPress'}></Button>
      <Link href={'/wallpaper'}>press to Wall Paper!</Link>
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
