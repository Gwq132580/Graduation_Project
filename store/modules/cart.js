export default{
	state:{
		a:111,
		list:[],
		selectedList:[]
	},
	getters:{
		checkedAll(state){
			return state.list.length===state.selectedList.length;
		},
		totalCount(state){
			let obj={
				num:0,
				price:0
			};
			obj.num=state.selectedList.length;
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id)>-1){
					obj.price+=v.cprice*v.num
				}
			})
			return obj;
		},
	},
	mutations:{
		//请求到数据赋值操作
		initGetData(state,list){
			state.list = list;
		},
		//全选
		 checkAll(state){
			 state.selectedList=state.list.map(v=>{
				 v.checked=true;
				 return v.id;
			 })
		 },
		//全不选
		unCheckAll(state){
			state.list.forEach(v=>{
				v.checked=false
			})
			state.selectedList=[];
		},
		selectItem(state,index){
			let id=state.list[index].id;
			let i=state.selectedList.indexOf(id);
			if(i>-1){
				state.list[index].checked=false;
				return state.selectedList.splice(i,1);
			}
			else{
				state.list[index].checked=true;
				state.selectedList.push(id);
			}	
		},
		delGoods(state){
			state.list=state.list.filter(v=>{
				return state.selectedList.indexOf(v.id)===-1;
			})
			console.log(JSON.stringify(state.selectedList))
		},
		addShopCart(state,goods){
			state.list.push(goods)
		}
	},
	actions:{
		checkedAllFn({commit,getters}){
			getters.checkedAll?commit("unCheckAll"):commit("checkAll")
		},
		delGoodsFn({commit}){
			commit('delGoods');
			commit('unCheckAll')
			uni.showToast({
				title:'删除成功',
				icon:'none'
			})
		}
		
	}
}