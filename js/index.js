var islogin;
var iszhankai=0;
var istx=0;

/** 默认数据 */
localStorage.setItem("author_1704116598336","小猪");
localStorage.setItem("header_1704116598336","小猪猪的疑问");

// 初始化数据库
let database = null;
const request = window.indexedDB.open("database");

request.onerror = (event) => {
  console.error('indexDB err:', event);
}

request.onsuccess = (event) => {
  database = request.result;
  addContent(1704116598336, '<p>怎么才能减肥</p>');
  console.log('database init success');
}

/** 数据库初始化 */
request.onupgradeneeded = (event) => {
  console.log('db create');
  const db = event.target.result;
  if (db.objectStoreNames.contains('content')) {
    console.log('db create return');
    return;
  }
  const store = db.createObjectStore('content', { keyPath: 'id' });
  store.createIndex('id', 'id', { unique: true });
  store.createIndex('content', 'content', { unique: false });
  console.log('db create db');
};

/** 数据库添加 */
function addContent(id, content) {
  if (!database) {
    console.log('database is not defined');
    return;
  }
  const request = database.transaction(['content'], 'readwrite')
    .objectStore('content')
    .add({ id, content});

  request.onsuccess = function (event) {
    console.log('数据写入成功', id, content);
  };

  request.onerror = function (event) {
    console.log('数据写入失败', event);
  }
}

/** 数据库查找 */
function getContent({ id, onsuccess, onerror }) {
  if (!database) {
    console.log('database is not defined');
    return;
  }
  const objectStore = database.transaction(['content'], 'readonly').objectStore('content');
  const request = objectStore.index('id').get(id);

  request.onerror = function(event) {
    console.log('事务失败');
    onerror();
  };

  request.onsuccess = function(event) {
    if (request.result) {
      onsuccess(request.result);
    } else {
      onerror();
    }
  };
}

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

let refEditor = null;
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

  refEditor = editor;
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
    return Date.now();
}
function fb(){
    var bt = $("fabubt").value; //标题
    const contentHtml = refEditor.getHtml();
    var user=localStorage.getItem("loginuser") || '小猪';
    var time=gettime();
    localStorage.setItem("header_" + time,bt);
    localStorage.setItem("author_" + time, user);
    addContent(time, contentHtml);
    // localStorage.setItem("nr_" + time, contentHtml);
    $("fabubt").value="";
    document.getElementById("fb").style.display='none';
    alert("发布成功");
    location.reload();
}

function createQuestionCard(header, author, content) {
  console.log('content', content);
  return `
    <div class='question-header'>${header}</div>
    <div class='question-author'>${author}</div>
    <div class='question-content'>${content}</div>
  `;
}

function openQuestion(questionId) {
  const questionHeader = localStorage.getItem(`header_${questionId}`);
  const questionAuthor = localStorage.getItem(`author_${questionId}`);
  // const questionContent = localStorage.getItem(`nr_${questionId}`);
  const el = document.getElementById('questionDetail');

  getContent({
    id: questionId,
    onsuccess: (questionContent) => {
      const questionInnerEl = createQuestionCard(questionHeader, questionAuthor, questionContent);
      el.innerHTML = questionInnerEl;
    },
    onerror: () => {}
  });
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

