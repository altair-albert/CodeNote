function toolbar() {
    return [
        "open", "save", "exportHTML", "exportPDF", "|", "undo", "redo", "|",
        "uppercase", "lowercase", "|",
        "h1", "h2", "h3", "h4", "h5", "h6", "|",
        "list-ul", "list-ol", "hr", "|",
        "link", "reference-link", "image", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
        "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
        "help", "info"
    ];
}

var customIcon = {
    open: 'fa-folder-open-o',
    save: 'fa-floppy-o',
    exportHTML: 'fa-file-code-o',
    exportPDF: 'fa-file-pdf-o'
};

var markdownEditor;
$(function() {
    global.window = window;
    global.gui = require('nw.gui');
    global.$ = $;
    global.fileName = "";
    global.success = function(msg) {
        $.amaran({
            message: msg,
            position: 'top right',
            inEffect: 'slideBottom'
        });
    };
    global.error = function(msg) {
        $.amaran({
            theme: 'colorful',
            content: {
                bgcolor: '#a70200',
                color: '#fff',
                message: msg
            },
            position: 'top right',
            inEffect: 'slideBottom'
        });
    };
    var os = require('os');
    var menu = require('../js/menu.js');
    (function(md, editor) {
        markdownEditor = editormd(editor, {
            width: "100%",
            height: "100%",
            path: '../lib/',
            theme: "dark",
            previewTheme: "dark",
            editorTheme: "pastel-on-dark",
            markdown: md,
            codeFold: true,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
            emoji: true,
            taskList: true,
            tocm: false, // Using [TOCM]
            tex: true, // 开启科学公式TeX语言支持，默认关闭
            flowChart: true, // 开启流程图支持，默认关闭
            sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
            dialogMaskOpacity: 0.4, // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            onload: function() {
                var editor = this;
                this.fullscreen();
                var saveKeyMap = {
                    "Ctrl-S": function(cm) {
                        menu.open("#save", editor);
                    },
                    "Ctrl-O": function(cm) {
                        menu.open("#open", editor);
                    },
                    "Shift-Ctrl-S": function(cm) {
                        menu.open("#saveas", editor);
                    },
                    "Shift-Ctrl-O": function(cm) {
                        menu.open("#exportHTML", editor);
                    }
                };
                this.addKeyMap(saveKeyMap);
            },
            toolbarIcons: toolbar(),
            toolbarIconsClass: customIcon,
            lang: {
                toolbar: {
                    open: "打开",
                    save: "保存", // 自定义按钮的提示文本，即title属性
                    exportHTML: "导出HTML",
                    exportPDF: "导出PDF"
                }
            },
            toolbarHandlers: {
                /**
                 * open file
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                open: function(editor) {
                     menu.open("#open", this);
                },
                /**
                 * save file
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                save: function(editor) {
                    menu.open("#save", this);
                },
                /**
                 * export HTML
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                exportHTML: function(editor) {
                    menu.open("#exportHTML", this);
                }
            }
        });
    })("", "editormd");
});
