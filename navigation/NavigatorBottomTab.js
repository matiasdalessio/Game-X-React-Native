import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../screens/Index';
import SignOptions from '../screens/SignOptions';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {




    const BottomTabView = ({ state, descriptors, navigation }) => {
      const focusedOptions = descriptors[state.routes[state.index].key].options;
        console.log(focusedOptions)
      if (focusedOptions.tabBarVisible === false) {
        return null;
      }
    
      return (
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}
              >
                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    
    
   return (
   <Tab.Navigator tabBar={props => <BottomTabView {...props} />}>
        <Tab.Screen name="home" component={Index} />
        <Tab.Screen name="signOptions" component={SignOptions}/> 
    </Tab.Navigator>
    )
}

export default BottomTabs