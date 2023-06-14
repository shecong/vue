import http  from '../utils/request.js'
import axios from 'axios'


export const Login=(user,password,checkcode)=>{
    axios({
        method: "post",
        url: "http://iwenwiki.com/api/blueberrypai/login.php",
        data: querystring.stringify({
            user_id: "iwen@qq.com",
            password: "iwen123",
            verification_code: "crfvw"
        })
    }).then(res => {
        console.log(res.data);
    })
          
    
}