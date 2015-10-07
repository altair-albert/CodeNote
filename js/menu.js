// 保存文件
function save(fileName, editor) {
    var fs = require('fs');
    var md = editor.getMarkdown();
    fs.writeFile(fileName, md, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Success Save file " + fileName);
        }
    });
};
// 加载数据到编辑器中
function loadData(md, editor) {
    var fs = require('fs');
    fs.readFile(md, 'utf-8', function(err, data) {
        if (err) {
            console.error("load file error :" + error);
        } else {
            editor.setMarkdown(data);
        }
    });
};
// 选择文件
function chooseFile(name, editor, callback) {
    var chooser = global.$(name);
    chooser.change(function(event) {
        global.fileName = global.$(name).val();
        callback(global.fileName, editor);
    });
    chooser.trigger('click');
};

// 选择文件夹
function chooseDir(name, editor, callback) {
    var chooser = global.$(name);
    chooser.change(function(evt) {
        callback(global.$(name).val(), editor);
    });
    chooser.trigger("click");
}
// 导出HTML
function exportHTML(name, editor) {
    copyFileTo(name);
    readFileData(name,editor.getPreviewedHTML(),writeFileTo);
};

/**
 * 将文件内容写入到模板中
 * @param  {path} name     需要写入的文件路径
 * @param  {text} tpl      读取到内存中的模板文件
 * @param  {string} contents 需要写入的内容
 */
function writeFileTo(name, tpl, contents) {
    contents.replace('>\s*<', '><');
    tpl.replace('{%text%}', contents);
    fs.writeFile(name + "/index.html", tpl, function(err) {
        if (err) {
            alert("ExportHTML false");
            console.log("export HTML false");
        } else {
            alert("ExportHTML success");
            console.log("export to " + name);
        }
    });
}
/**
 * 从模板文件读取数据到内存中
 * @param  {path}   name    文件路径
 * @param  {string}   text   HTML need to write
 * @param  {Function} callback
 */
function readFileData(name, text, callback) {
    var fs = require("fs");
    var path = require('path');
    fs.readFile(path.dirname(__dirname) + '/export/index.html', 'utf-8', function(err, tpl) {
        if (err) {
            console.log(err);
        } else {
            console.log("read file ok!");
            callback(name, tpl, text);
        }
    });
}

/**
 * copy file to dest
 * @param  {path} name  the path of dest
 */
function copyFileTo(name) {
    var copydir = require("copy-dir");
    var path = require('path');
    copydir.sync(path.dirname(__dirname) + '/export/', name, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("move to " + name);
        }
    });
}
// 导出PDF
function exportPDF(name, editor) {
    // body...
}

// 打开选择对话框
exports.open = function(target, editor) {
    if (target == "#saveas") { // 另存为
        chooseFile(target, editor, save);
    } else if (target == "#open") { // 打开
        chooseFile(target, editor, loadData);
    } else if (target == "#save") { //保存
        if (global.fileName != "") {
            save(global.fileName, editor);
        } else {
            chooseFile("saveas", editor, save);
        }
    } else if (target == "#exportHTML") {
        chooseDir(target, editor, exportHTML);
    } else if (target == "#exportPDF") {
        chooseDir(target, editor, exportPDF);
    }
};
