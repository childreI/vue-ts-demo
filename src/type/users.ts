export interface Listint {
    id: number,
    nickName:string,
    role:Roleint[]
    userName:string 
}

interface Roleint {
    role:number,
    roleName:string,
}

interface SelectDataInt {
    role:number,
    nickName:string
}

interface RoleListInt {
    authority:number[],
    roleId:number,
    roleName:string
}
interface ActiveInt {
    id: number,
    nickName:string,
    role:number[]
    userName:string 
}
export class InitData {
    selectData:SelectDataInt={
        nickName:"",
        role:0
    }
    list:Listint[]=[]
    roleList:RoleListInt[]=[]
    isShow=false
    active:ActiveInt={
        id: 0,
        nickName:"",
        role:[],
        userName:"" 
    }
}