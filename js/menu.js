var message = require('./message.js');
/**
 * save file to some path
 * @param  {path} fileName file which need to save
 * @param  {mdeditor} editor   markdown editor
 */
function save(fileName, editor) {
    var fs = require('fs');
    var md = editor.getMarkdown();
    fs.writeFile(fileName, md, function(err) {
        if (err) {
            global.error(message('error'));
        } else {
            global.success(message('success'));
        }
    });
};
/**
 * load file data to markdown editor
 * @param  {string} md     which need to load
 * @param  {mdeditor} editor markdown entity
 */
function loadData(md, editor) {
    var fs = require('fs');
    fs.readFile(md, 'utf-8', function(err, data) {
        if (err) {
            global.error(message('openfile','error'))
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


/**
 * 将文件内容写入到模板中
 * @param  {path} name     需要写入的文件路径
 * @param  {text} tpl      读取到内存中的模板文件
 * @param  {string} contents 需要写入的内容
 */
function writeFileTo(name, tpl, contents) {
    var fs = require('fs');
    contents.replace('>\s*<', '><');
    var html = tpl.replace('<data>', contents);
    fs.writeFile(name + "/index.html", html, function(err) {
        if (err) {
            global.error(message('exportHTML','error'));
        } else {
            global.success(message('exportHTML','success'));
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
            global.error(message('exportHTML','error'));
        } else {
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
    copydir.sync(path.dirname(__dirname) + '/export/', name, function(_stat, _path, _file) {
        var stat = true;
        if (_stat === 'file' && path.extname(_path) === '.html') {
            // copy files, without .html
            stat = false;
        }
        return stat;
    }, function(err) {
        if (err) {
            console.log("copy dir is false", err);
        } else {
            console.log("move to ", name);
        }
    });
}
/**
 * export HTML to dest
 * @param  {path} name   path to save HTML
 * @param  {mdeditor} editor editor entity
 */
function exportHTML(name, editor) {
    copyFileTo(name);
    readFileData(name, editor.getPreviewedHTML(), writeFileTo);
};
// 导出PDF
function exportPDF(name, editor) {
    // TODO
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
