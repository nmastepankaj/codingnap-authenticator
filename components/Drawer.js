import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './Home';
import About from './About';

// function Feed({ navigation }) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Feed Screen</Text>
//         <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//         <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//       </View>
//     );
//   }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
      </View>
    );
  }

  
function Drawer() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        // useLegacyImplementation
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
      
      
    );
  }

export default Drawer;