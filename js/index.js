var islogin;
var iszhankai=0;
var istx=0;
localStorage.setItem( "header_笨笨_2022-12-28 12:41:22","HTML全称");
localStorage.setItem("nr_HTML全称","HTML的英文全称是Hyper Text Markup Language，那么它的中文全称是什么？");
localStorage.setItem( "header_醋醋_2022-12-27 19:11:29","css全称");
localStorage.setItem("nr_css全称","css的中文全称是什么？");
localStorage.setItem("pl_醋醋_HTML全称_2022-12-30 15:51:10","超文本标记语言");
localStorage.setItem("pl_笨笨_css全称_2022-12-30 16:51:12","层叠样式表");
function judgelogin(){
    if(localStorage.getItem("loginuser")=="null"){
        document.getElementById("sousuo").style.display='none';
        document.getElementById("touxiang").style.display='none';
        document.getElementById("anniu").style.display='flex';
    }
    else{
        document.getElementById("sousuo").style.display='flex';
        document.getElementById("touxiang").style.display='flex';
        document.getElementById("anniu").style.display='none';
    }
}

function zhankaipl(id){
    if(iszhankai==0){
        document.getElementById(id).style.display='none';
        iszhankai=1;
    }
    else{
        document.getElementById(id).style.display='block';
        iszhankai=0;
    }
}
function tx(){
    if(istx==1){
        document.getElementById("Popover15-content").style.display='none';
        istx=0;
    }
    else{
        document.getElementById("Popover15-content").style.display='block';
        istx=1;
    }
}
function fabu(){
  document.getElementById("fb").style.display='flex';

  /** 编辑器初始化 */
  const { createEditor, createToolbar } = window.wangEditor

  const editorConfig = {
      placeholder: 'Type here...',
      MENU_CONF: {
        uploadImage: {
          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 512 * 1024 * 1024 // 5kb
        }
      }
  }

  const editor = createEditor({
      selector: '#editor-container',
      html: '<p><br></p>',
      config: editorConfig,
      mode: 'default', // or 'simple'
  })

  const toolbarConfig = {}

  const toolbar = createToolbar({
      editor,
      selector: '#toolbar-container',
      config: toolbarConfig,
      mode: 'default', // or 'simple'
  })
}
function closefabu(){
    document.getElementById("fb").style.display='none';
}
function notlogin(){
    localStorage.setItem( "loginuser","null");
    islogin=0;
    judgelogin();
}
function login(){
    localStorage.setItem( "loginuser","笨笨");
    islogin=1;
    judgelogin();
}
function $(id){
    return document.getElementById(id);
}
function gettime(){
    var timestamp=new Date().getTime();
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
function fb(){
    var bt = $("fabubt").value;
    var nr = $("fabunr").value;
    var user=localStorage.getItem("loginuser");
    var time=gettime();
    localStorage.setItem( "header_"+user+"_"+time,bt);
    localStorage.setItem("nr_"+bt,nr);
    $("fabubt").value="";
    $("fabunr").value="";
    document.getElementById("fb").style.display='none';
    alert("发布成功");
    location.reload();
}
function plfb(id,header){
    var nr = $(id).value;
    var user=localStorage.getItem("loginuser");
    var time=gettime();
    if(localStorage.getItem("loginuser")!="null"){
    localStorage.setItem("pl_"+user+"_"+header+"_"+time,nr);
    $(id).value="";
    alert("评论成功");
    location.reload();
    }
    else{
        alert("请先登录！");
    }
}
function delfb(header){
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(localStorage.getItem(key)==header||key.indexOf(header)!=-1){
            localStorage.removeItem(key);
        }
    }
    alert("删除成功");
    location.reload();
}
function delpl(user,header,time){
    localStorage.removeItem("pl_"+user+"_"+header+"_"+time);
    alert("删除成功");
    location.reload();
}
function gotologin(){
    window.location="login.html";
}

