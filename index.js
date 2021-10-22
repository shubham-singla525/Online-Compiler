var textarea = document.getElementById("textarea");
var options = document.getElementsByClassName("options");
var compile_btn = document.getElementById("compile");
var output = document.getElementById("output_content");
let request,request1;

textarea.addEventListener("change",function(event){
    textarea.innerHTML = event.target.value;
})

var obj ={
  "C":"7",
  "C++":"77",
  "Java":"8",
  "Python":"0",
  "JavaScript":"4"
}
compile_btn.addEventListener("click",
function(){
  compile_btn.disabled = true;
  compile_btn.style.background="black";
  compile_btn.style.color = "white";
  let option;
  let result;
    for(key in options){
      if(options[key].checked===true){
        option = options[key].value 
      }
    }
    
    request = new XMLHttpRequest();
    request1 = new XMLHttpRequest();
   setTimeout(function(){
    request.open("POST","https://codequotient.com/api/executeCode");
       
    var info = {
      "code":textarea.innerHTML,
      langId:obj[option]
    }
   request.setRequestHeader("Content-Type","application/JSON"); 
   request.send(JSON.stringify(info));   
   request.addEventListener("load",function(){
      console.log(JSON.parse(request.responseText));
      result=JSON.parse(request.responseText);
      setTimeout(function(){
        request1.open("GET",`https://codequotient.com/api/codeResult/${result.codeId}`);
        request1.setRequestHeader("Content-Type","application/JSON");
        request1.send();
        request1.addEventListener('load',function(){
          console.log(JSON.parse(request1.responseText));
         
          var data = JSON.parse(request1.responseText);
          var data = JSON.parse(data.data);
        //  console.log(data["output"]);
        //  console.log(data["errors"]);
        //  console.log(data.code);
        //  console.log(data.time);
      
          if(data["output"]){
            output.innerHTML = data["output"];
          }
          else if(data["errors"]){
            output.innerHTML = data["errors"];
          }
          compile_btn.removeAttribute("disabled");
           compile_btn.style.background="#EFEFEF";
           compile_btn.style.color = "black";
           compile_btn.style.border = "#black";
          
            })
  },2000);   
 
    })
   
},2000);
          
 });


  
   
   
 
