import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';
import {BottomTabBar} from '@react-navigation/bottom-tabs'
import Colors from '../../constants/Colors';
import Player from '../../components/Player';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ccc',
        tabBarInactiveTintColor: '#343434',
        tabBarActiveBackgroundColor: '#191C20',
        tabBarInactiveBackgroundColor: '#191C20'
      }}
      tabBar={(props)=>(
        <View>
          <Player/>
          <BottomTabBar {...props}/>
        </View>
      )}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={'#fff'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor: '#191C20'
          },
            headerTitleStyle:{
            color:'#fff'
          }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerStyle:{
            backgroundColor: '#191C20'
          },
          headerTitleStyle:{
            color:'#fff'
          }
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown:true,
          headerTitleAlign:'center',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerStyle:{
            backgroundColor: '#191C20',
          },
          headerTitleStyle:{
            color:'#fff'
          }
        }}
      />
    </Tabs>
  );
}
