import React,{Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

//引用外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';

export default class GDHourList extends Component {	
	
	//返回左边按钮
	renderLeftItem(){
		return(
			<TouchableOpacity>
				<Image source={{uri:'hot_icon_20x20'}} style={styles.navbarLeftItemStyle} />
			</TouchableOpacity>
		);
	}
	
	//返回中间按钮
	renderTitleItem(){
		return(
			<Image source={{uri:'navtitle_rank_106x20'}} style={styles.navBarTitleItemStyle} />
		);
	}
	
	//返回右边按钮
	renderRightItem(){
		return(
			<TouchableOpacity>
				<Text style={styles.navBarRightItemStyle}>设置</Text>
			</TouchableOpacity>
		);
	}
	
	render(){
		return (
			<View style={styles.container}>
				{/*导航栏样式*/}
				<CommunalNavBar 
					titleItem = {() => this.renderTitleItem()}
					rightItem = {() => this.renderRightItem()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    navBarTitleItemStyle: {
        width:106,
        height:20,
        marginLeft:50
    },
    navBarRightItemStyle: {
        fontSize:17,
        color:'rgba(123,178,114,1.0)',
        marginRight:15,
    },
});