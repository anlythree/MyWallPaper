import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable, StyleSheet} from 'react-native';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {BlurView} from "expo-blur";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                tabBarStyle:{position:"absolute"},
                tabBarBackground:()=>(
                    <BlurView intensity={60} experimentalBlurMethod={"dimezisBlurView"}
                              style={[StyleSheet.absoluteFillObject, {flex: 1}]}
                    />
                )
            }}>
            <Tabs.Screen
                name="gallery"
                options={{
                    title: 'Gallery',
                    tabBarIcon: ({color}) => <TabBarIcon name="th" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Today',
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>
                }}
            />
            <Tabs.Screen
                name="me"
                options={{
                    title: 'Me',
                    tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
                }}
            />
        </Tabs>
    );
}
