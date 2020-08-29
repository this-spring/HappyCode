<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-07 16:06:15
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 02:58:32
-->
# HappyCode
show code better 

# Show  
show js code better:  https://this-spring.github.io/HappyCode/test.html  

design:  https://this-spring.github.io/HappyCode

# design  

## 关键字  

const function let break while.....  

color: #3B8CC2

<span style="color: #3B8CC2">const</span>  

## 变量  

const CmdType

color: #46C3FF  

<span style="color: #3B8CC2">const</span>  <span style="color:#46c3ff">CmdType</span>  

## 符号  

=,;,(,),=,->,{,}....  

color: #CFCFCF  

<span style="color: #3B8CC2">const</span>  <span style="color:#46c3ff">CmdType</span>  <span style="color:#CFCFCF">=</span>  

## 字符串  

const CmdType = 'UnZip'  

color: #D88E73  

<span style="color: #3B8CC2">const</span>  <span style="color:#46c3ff">CmdType</span>  <span style="color:#CFCFCF">=</span>  <span style="color:#D88E73">'UnZip'</span></span><span style="color:#CFCFCF">;</span>  

## 属性  

const obj = {
    x: 'x'
}  

color: #9DDBEF  

<span style="color: #3B8CC2">const</span>  <span style="color:#46c3ff">obj</span>  <span style="color:#CFCFCF">=</span> <span style="color:#CFCFCF">{</span> <span style="color:#9DDBEF">x</span> 
<span style="color:#CFCFCF">:</span>
<span style="color:#D88E73">'x'</span></span><span style="color:#CFCFCF">}</span>

# Code  


## core-parse  

提供解析code到token，按照上面设计进行分类，将分好类的token交给style层  

## style  

把配置好的class渲染到界面上，然后根据上层返回token进行class一对一配置，将有class的token交给render  

## render  

拿到带有class的token后，创建相应标签进行渲染  

# Use  

step1:  

<script src="./dist/HappyCode.min.js"></script>


step2:  

const rd = new HappyCode();


step3:  

rd.render(code, ele);

# Demo

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script src="./dist/HappyCode.min.js"></script>
<body>
    <div id="app" style="height: 800px; width: 800px; border: 1px solid red;">

    </div>
</body>
</html>

<script>
    const rd = new HappyCode();
    const code = `const compressing = require('compressing');

        const TAG = 'ProcessTask';

        const CmdType = {
        CompressZip: 'CompressZip',
        UnZip: 'UnZip',
        };
        const obj = {
            x: 'x',
            co: function x() {
            
            }
        };
        let arr = [];
        console.log(arr);
        console.log(obj);

        process.on('message', (res) => {});`;
    rd.render(code, document.getElementById("app"));

</script>
```