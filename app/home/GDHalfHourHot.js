import React,{Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions,
	DeviceEventEmitter,
} from 'react-native';

//第三方
import {PullList} from 'react-native-pull';

const {width,height} = Dimensions.get('window');

//引用外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import CommunalHotCell from '../main/GDCommunalHotCell';
import NoDataView from '../main/GDNoDataView';
import HTTPBase from '../http/HTTPBase';

export default class GDHalfHourHot extends Component {	
	
	constructor(props){
		super(props);
		//初始状态
		this.state={
			dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
			loaded:false,
		}
		this.fetchData = this.fetchData.bind(this);
	}
	
	//网络请求
	fetchData(resolve){
		HTTPBase.get('http://guangdiu.com/api/gethots.php')
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
		/*setTimeout(() =>{
			fetch('http://guangdiu.com/api/gethots.php')
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
	
	popToHome(){
		this.props.navigator.pop();
	}
	
	//返回中间按钮
	renderTitleItem(){
		return(
			<Text style={styles.navbarTitleItemStyle}>近半小时热门</Text>
		);
	}
	
	//返回右边按钮
	renderRightItem(){
		return(
			<TouchableOpacity
				onPress={()=> {this.popToHome()}}
			>
				<Text style={styles.navbarRightItemStyle}>关闭</Text>
			</TouchableOpacity>
		);
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
	
	componentWillMount(){
		DeviceEventEmitter.emit('isHiddenTabBar',true);
	}
	
	componentWillUnmount(){
		DeviceEventEmitter.emit('isHiddenTabBar',false);
	}
	
	componentDidMount(){
		this.fetchData();
	}

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
				/>
			);
		}
	}
	
	render(){
		return (
			<View style={styles.container}>
				{/*导航栏样式*/}
				<CommunalNavBar 
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
    navbarTitleItemStyle:{
    	fontSize:17,
    	color:'black',
    	marginLeft:50,
    },
    navbarRightItemStyle:{
    	fontSize:17,
    	color:'rgba(123,178,114,1.0)',
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