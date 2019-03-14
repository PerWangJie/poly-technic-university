import store from '../../store';
export default function hasPermission(permission) {
	var myBtns = store.state.btns;
	if(myBtns == "" || myBtns == null || typeof myBtns == undefined){
		return false;
	}
	//console.log(myBtns);
	return myBtns.indexOf(permission) > -1;
}
