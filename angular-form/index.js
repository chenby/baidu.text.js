var app=angular.module("my.app",[]);
app.controller("checkCtrl",["$scope","text_check",function($scope,text_check){
    $scope.data={user:""};  //初始化数据
     $scope.warning={   
        user:"",
        pass:"",
        repass:"",
        email:"",
        tel:""
    }
    var beSet={  //设置是否被设置了提示，避免每次focus都提示
        user:false,
        pass:false,
        repass:false,
        email:false,
        tel:false
    };
    $scope.beok={   //设置是否可以判断表单，避免每次input都会判断表单
        user:false,
        pass:false,
        repass:false,
        email:false,
        tel:false
    }
    $scope.setWaning=function(self){
        var arr={          //默认提示
            user:"请输入长度为4-16的字符",
            pass:"请输入多于4位密码",
            repass:"再次输入相同密码",
            email:"请输入邮箱",
            tel:"请输入手机号码"
        }
        if (!beSet[self]) {
            $scope.warning[self]=arr[self];
            beSet[self]=true;
        };
        
    }
   
    $scope.userCheck=function(){
        $scope.beok.user=true;
       if (text_check.check($scope.data.user)=="格式正确") {   //验证格式
          $scope.form.username.$setValidity("username",true);   //设置username这项验证不通过
          $scope.warning.user=text_check.check($scope.data.user);
       }else if ($scope.data.user){ 
         $scope.form.username.$setValidity("username",false)   //设置本项验证通过
         $scope.warning.user=text_check.check($scope.data.user);
       }
    }
    $scope.passCheck=function(){
         $scope.beok.pass=true;
        if ($scope.data.pass&&$scope.data.pass.toString().length>=4) {    //验证密码
            $scope.warning.pass="密码可用";
             $scope.form.password.$setValidity("password",true); //设置本项验证通过
        }else if($scope.data.pass){
            $scope.warning.pass="密码不可用";
            $scope.form.password.$setValidity("password",false); 
        }
    }
     $scope.repassCheck=function(){
         $scope.beok.repass=true;
        if ($scope.data.repass&&$scope.data.pass==$scope.data.repass) { 
            $scope.warning.repass="重复密码正确";
             $scope.form.repassword.$setValidity("repassword",true); //设置验证通过
        }else if($scope.data.repass){
            $scope.warning.repass="重复密码不正确";
            $scope.form.repassword.$setValidity("repassword",false); 
        }
    }
    $scope.emailCheck=function(){
         $scope.beok.email=true;
        if ($scope.form.email.$valid) {   //判断是否验证通过
            $scope.warning.email="邮箱格式正确";
        }else if($scope.form.email.$dirty){  //保证email不为空
            $scope.warning.email="邮箱格式错误";
        }
    }
     $scope.telCheck=function(){
        $scope.beok.tel=true;
        if ($scope.form.tel.$valid) {   //判断是否验证通过
            $scope.warning.tel="手机格式格式正确";
        }else if($scope.form.tel.$dirty){
            $scope.warning.tel="手机格式格式错误";
        }
    }
    $scope.submit=function(){

        $scope.form.$setDirty();
        if($scope.form.$valid){   //判断表单是否全部验证通过
            alert("提交成功！");
        }else {
            alert("提交有误")
        }
    }
}])
app.service("text_check",function(){   //验证输入情况
    return {
        check:function check(input) {
                input=input||"";
                var st = "";
                if (typeof input === "number") {
                    st = input.toString();
                }
                else {
                    st = input.replace(/[\u4E00-\u9FA5]/g, "aa");  //是汉字替换为2个字符的字母
                }
                switch(true){
                  case st.length<4&&st.length!=0:return "输入不能小于4个字符";break;
                  case st.length>14:return "输入不能大于14个字符";break;
                  case st.length==0:return "输入不能为空";break;
                  default:return "格式正确";
                }
            }
    }
})
 