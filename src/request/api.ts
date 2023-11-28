import service from ".";
interface loginData{
    username:string,
    password:string
}
// 登录接口
export function login(data:loginData){
    return service({
        url:"/login",
        method:"post",
        data
    })
}
// 商品列表接口
export function Goodlist(){
    return service(
        {
            url:"/getGoodsList",
            method:"get"
        }
    )
}

export function UserList(){
    return service(
        {
            url:"/getUserList",
            method:"get"
        }
    )
}

export function Rolelist(){
    return service(
        {
            url:"/getRoleList",
            method:"get"
        }
    )
}