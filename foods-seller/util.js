/** 
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object{id:123,a:b}
*/
export function urlParse(){
  let url=window.location.search;
  let obj={};
  let reg=/[?&][^?&]+=[^?&]+/g;
  let arr=url.match(reg);
  if(arr){
    arr.forEach((item)=>{
      let tempArr=item.substring(1).split('=');
      let key=decodeURIComponent(tempArr[0]);
      let val=decodeURIComponent(tempArr[1]);
      obj[key]=val;
    })
  }
  return obj;
}

/** 
 * 不同用户数据的存取
*/
export function saveToLocal(id,key,value){
  let seller=window.localStorage.__seller__;
  if(!seller){
    seller={};
    seller[id]={};
  }
  else{
    seller=JSON.parse(seller);
    if(!seller[id]){
      seller[id]={};
    }
  }
  seller[id][key]=value;
  localStorage.__seller__=JSON.stringify(seller);
}

export function loadFromLocal(id,key,def){
  let seller=window.localStorage.__seller__;
  if(!seller){
    return def;
  }
  seller=JSON.parse(seller)[id];
  if(!seller){
    return def;
  }
  let ret=seller[key];
  return ret || def;
}