var com = com || {};
//debug alert
com.alert = function(obj, f, n) {
    if (typeof obj !== "object") {
        try {
            console.log(obj);
        } catch (e) {}
        //return alert(obj);
    }
    var arr = [];
    for (var i in obj) arr.push(i + " = " + obj[i]);
    try {
        console.log(arr.join(n || "\n"));
    } catch (e) {}
    //return alert(arr.join(n||"\n\r"));
};
//com.alert的简写，考虑z变量名最不常用
var z = com.alert;

//获取ID
com.get = function(id) {
    return document.getElementById(id);
};

//获取元素距离页面左侧的距离
com.getDomXY = function(dom) {
    var left = dom.offsetLeft;
    var top = dom.offsetTop;
    var current = dom.offsetParent;
    while (current !== null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        x: left,
        y: top
    };
};

//获得cookie
com.getCookie = function(name) {
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + "=");
        if (start != -1) {
            start = start + name.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return false;
};
//二维数组克隆
com.arr2Clone = function(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].slice();
    }
    return newArr;
};

//ajax载入数据
com.getData = function(url, fun) {
    var XMLHttpRequestObject = false;
    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (XMLHttpRequestObject) {
        XMLHttpRequestObject.open("GET", url);
        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObject.onreadystatechange = function() {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                fun(XMLHttpRequestObject.responseText);
                //return XMLHttpRequestObject.responseText;
            }
        };
        XMLHttpRequestObject.send(null);
    }
};

com.b2str = function(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};
com.str2ab = function(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};