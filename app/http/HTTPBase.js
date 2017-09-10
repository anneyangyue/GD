let HTTPBase = {};

/*
*
* GET请求
*
*@param url
*@param params {}
*@param headers
*
*@return {Promise}
*
*/
HTTPBase.get = function(url,params,headers){
	if(params){

		let paramsArray = [];
		//获取params内所有的key
		let paramsKeyArray = Object.keys(params);
		//通过forEach拿到数组中每个元素，将元素与参数的值进行拼接处理，并且放入paramsArray中
		paramsKeyArray.forEach(key => paramsArray.push(key+ '=' + params[key]));

		//网址拼接
		if(url.search(/\?/) === -1){
			url += '?' + paramsArray.join('&');
		}else{
			url += paramsArray.join('&');
		}
	}

	return new Promise(function(resolve,reject){
		fetch(url,{
			method:'GET',
			headers:headers
		})
		.then((response) => response.json())
		.then((response) => {
			resolve(response);
		})
		.catch((error) => {
			reject({status:-1})
		})
		.done();
	})
}

/*
*
* POST请求
*
*@param url
*@param params {}
*@param headers
*
*@return {Promise}
*
*/
HTTPBase.post = function(url,params,headers){
	if(params){

		let paramsArray = [];
		//初始化FormData
		var formData = new FormData();//此处使用let会报错，let的作用域是区块，下面获取不到

		//获取params内所有的key
		let paramsKeyArray = Object.keys(params);
		//通过forEach拿到数组中每个元素，将元素与参数的值进行拼接处理，并且放入paramsArray中
		paramsKeyArray.forEach(key => formData.append(key,params[key]));


	}

	return new Promise(function(resolve,reject){
		fetch(url,{
			method:'POST',
			headers:headers,
			body:formData,
		})
		.then((response) => response.json())
		.then((response) => {
			resolve(response);
		})
		.catch((error) => {
			reject({status:-1})
		})
		.done();
	})
}

module.exports = HTTPBase;