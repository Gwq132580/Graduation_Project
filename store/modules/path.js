export default{
	state:{
		list:[
		]
	},
	getters:{
		defaultPath(state){
			return state.list.filter(v=>{
				return v.isDefault==1
			})
		},
	},
	mutations:{
		_initAddressList(state,list){
			state.list=list
		},
		createPath(state,obj){
			state.list.unshift(obj);
		},
		updatePath(state,{index,item}){
			for(let k in item){
				state.list[index][k]=item[k]
			}
		},
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault=0
				}
			})
		}
	},
	actions:{
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit('removePath');
			}
			commit('createPath',obj);
		},
		updatePathFn({commit},obj){
			if(obj.item.isDefault){
				commit('removePath');
			}
			commit('updatePath',obj)
		}
	}
}