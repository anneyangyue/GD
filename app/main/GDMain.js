import React,{Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	DeviceEventEmitter,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

//引入第三方框架
import TabNavigator from 'react-native-tab-navigator';

import Home from '../home/GDHome';
import Ht from '../ht/GDHt';
import HourList from '../hourList/GDHourList';

export default class myGD extends Component {
	
	// ES6
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab:'home',     // 首选页面
            isHiddenTabBar:false,
        };
    }

    //设置Navigator跳转动画
    setNavAnimationType(route){
    	if (route.animationType) { 
    		let conf = route.animationType;
    		conf.gestures = null;
    		return conf;
    	}else{
    		return Navigator.SceneConfigs.PushFromRight;
    	}
    }
	
	// 返回 TabBar 的 Item
	renderTabBarItem(title,selectedTab,image,selectImage,component){
		return (
			<TabNavigator.Item
			    selected={this.state.selectedTab === selectedTab}
			    title={title}
			    selectedTitleStyle={{color:'black'}} //设置点击后的颜色
			    renderIcon={() => <Image source={{uri:image}} style={styles.tabbarIconStyle} />}
			    renderSelectedIcon={() => <Image source={{uri:selectImage}} style={styles.tabbarIconStyle} />}
			    onPress={() => this.setState({ selectedTab: selectedTab })}>
			    <Navigator 
			    	initialRoute = {{
			    		name:selectedTab,
			    		component:component
			    	}}

			    	configureScene = {(route) => this.setNavAnimationType(route)}
			    	
			    	renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params}
                                          navigator={navigator} />
                    }}
			    />
			  </TabNavigator.Item>
		)
	}
	
	tongzhi(data){
		this.setState({
			isHiddenTabBar:data,
		});
	}
	
	componentDidMount(){
		this.subscription = DeviceEventEmitter.addListener('isHiddenTabBar',(data)=>{
			this.tongzhi(data)});
	}
	
	componentWillUnmount(){
		this.subscription.remove();
	}
	
	render(){
		return (
			<TabNavigator
				tabBarStyle={this.state.isHiddenTabBar !== true ? {}:{height:0,overflow:'hidden'}}
				sceneStyle={this.state.isHiddenTabBar !== true ? {}:{paddingBottom:0}}
			>
				{/* 首页 */}
                {this.renderTabBarItem("首页", 'home', 'tabbar_home_30x30', 'tabbar_home_selected_30x30', Home)}
                {/* 海淘 */}
                {this.renderTabBarItem("海淘", 'ht', 'tabbar_abroad_30x30', 'tabbar_abroad_selected_30x30', Ht)}
                {/* 小时风云榜 */}
                {this.renderTabBarItem("小时风云榜", 'hourlist', 'tabbar_rank_30x30', 'tabbar_rank_selected_30x30', HourList)}
			</TabNavigator>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        width:Platform.OS === 'ios' ? 30 : 25,
        height:Platform.OS === 'ios' ? 30 : 25,
    }
});