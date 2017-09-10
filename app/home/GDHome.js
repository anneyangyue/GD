import React,{Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

//第三方
import {PullList} from 'react-native-pull';

const {width,height} = Dimensions.get('window');

//引用外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import HalfHourHot from './GDHalfHourHot';
import Search from './GDSearch';
import CommunalHotCell from '../main/GDCommunalHotCell';
import NoDataView from '../main/GDNoDataView';

import HTTPBase from '../http/HTTPBase'

export default class GDHome extends Component {	
	
	constructor(props){
		super(props);
		//初始状态
		this.state={
			dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
			loaded:false,
		}
		this.fetchData = this.fetchData.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	//网络请求
	fetchData(resolve){

		let params = {'count':5}

		HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
		.then((response)=>{
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(response.data),
				loaded:true,
			});
			if(resolve !== undefined){
				setTimeout(() =>{
					resolve();
				},2000);	
			}
		})
		.catch((error) => {
			
		})

			
		/*setTimeout(() =>{
			let formData = new FormData();
			formData.append('count','5');
			formData.append('mall','京东商城');

			fetch('https://guangdiu.com/api/getlist.php',{
				method:'POST',
				headers:{},
				body:formData,
			})
			.then((response) => response.json())
			.then((response)=>{
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(response.data),
					loaded:true,
				});
				if(resolve !== undefined){
					setTimeout(() =>{
						resolve();
					},2000);	
				}
			})
			.done()
		},500);*/
	}

	//跳转到近半小时热门
	pushToHalfHourHot(){
		this.props.navigator.push({
			component:HalfHourHot,
			animationType:Navigator.SceneConfigs.FloatFromBottom,
		})
	}

	//跳转到搜索
	pushToSearch(){
		this.props.navigator.push({
			component:Search,
		})
	}
	
	//返回左边按钮
	renderLeftItem(){
		return(
			<TouchableOpacity onPress={() => {this.pushToHalfHourHot()}}>
				<Image source={{uri:'hot_icon_20x20'}} style={styles.navbarLeftItemStyle} />
			</TouchableOpacity>
		);
	}
	
	//返回中间按钮
	renderTitleItem(){
		return(
			<TouchableOpacity>
				<Image source={{uri:'navtitle_home_down_66x20'}} style={styles.navbarTitleItemStyle} />
			</TouchableOpacity>
		);
	}
	
	//返回右边按钮
	renderRightItem(){
		return(
			<TouchableOpacity onPress={()=>this.pushToSearch()}>
				<Image source={{uri:'search_icon_20x20'}} style={styles.navbarRightItemStyle} />
			</TouchableOpacity>
		);
	}

	loadMore(){
		// fetch('http://guangdiu.com/api/gethots.php')
		// 	.then((response) => response.json())
		// 	.then((response)=>{
		// 		this.setState({
		// 			dataSource:this.state.dataSource.cloneWithRows(response.data),
		// 			loaded:true,
		// 		});
		// 	})
		// 	.done()
	}

	renderFooter() {
        return (
	        <View style={{height: 100}}>
	            <ActivityIndicator />
	        </View>
        );
    }

	//根据网络状态决定是否渲染ListView
	renderListView(){
		if(this.state.loaded === false) {
			return(
				<NoDataView />
			);
		}else{
			return(
				<PullList 
					onPullRelease={(resolve)=>this.fetchData(resolve)}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					showsHorizontalScrollIndicator={false}
					style={styles.listViewStyle}
					onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
				/>
			);
		}
	}

	//返回每一行cell的样式
	renderRow(rowData){
		return(
			<CommunalHotCell
				image={rowData.image}
				title={rowData.title}
			/>
		);
	}

	componentDidMount(){
		this.fetchData();
	}
	
	render(){
		return (
			<View style={styles.container}>
				{/*导航栏样式*/}
				<CommunalNavBar 
					leftItem = {() => this.renderLeftItem()}
					titleItem = {() => this.renderTitleItem()}
					rightItem = {() => this.renderRightItem()}
				/>

				{/*顶部提示*/}
				<View style={styles.headerPromptStyle}>
					<Text>根据每条折扣的点击进行统计,每5分钟更新一次</Text>
				</View>
				
				{/*根据网络状态决定是否渲染ListView*/}
				{this.renderListView()}
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
    navbarLeftItemStyle:{
    	width:20,
        height:20,
        marginLeft:15,
    },
    navbarTitleItemStyle:{
    	width:66,
        height:20,
    },
    navbarRightItemStyle:{
    	width:20,
        height:20,
        marginRight:15,
    },
    listViewStyle:{
    	width:width,
    	
    },
    headerPromptStyle:{
    	height:44,
    	width:width,
    	backgroundColor:'rgba(239,239,239,0.5)',
    	justifyContent:'center',
    	alignItems:'center',
    },
});