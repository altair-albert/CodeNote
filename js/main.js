function toolbar() {
    return [
        "open", "save", "exportHTML", "exportPDF", "|", "undo", "redo", "|",
        "uppercase", "lowercase", "|",
        "h1", "h2", "h3", "h4", "h5", "h6", "|",
        "list-ul", "list-ol", "hr", "|",
        "link", "reference-link", "image", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
        "goto-line", "watch", "preview", "clear", "search", "changetheme", "|",
        "help", "info"
    ];
}

var customIcon = {
    open: 'fa-folder-open-o',
    save: 'fa-floppy-o',
    exportHTML: 'fa-file-code-o',
    exportPDF: 'fa-file-pdf-o',
    changetheme: 'fa-moon-o'
};

var markdownEditor;
$(function() {
    global.window = window;
    var gui = global.gui = require('nw.gui');
    var win = gui.Window.get();
    win.maximize();
    global.$ = $;
    global.fileName = "";
    var os = require('os');
    var operation = require('../js/operation.js');
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
            dialogMaskBgColor: "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            disabledKeyMaps: ["F11"],
            onload: function() {
                var editor = this;
                this.fullscreen();
                win.on("resize", function(w, h) {
                    editor.resize(w, h);
                });
                var saveKeyMap = {
                    "Ctrl-S": function(cm) {
                        operation.open("#save", editor);
                    },
                    "Ctrl-O": function(cm) {
                        operation.open("#open", editor);
                    },
                    "Shift-Ctrl-S": function(cm) {
                        operation.open("#saveas", editor);
                    },
                    "Shift-Ctrl-O": function(cm) {
                        operation.open("#exportHTML", editor);
                    },
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
                    exportPDF: "导出PDF",
                    changetheme:"夜间模式"
                }
            },
            toolbarHandlers: {
                /**
                 * open file
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                open: function(editor) {
                    operation.open("#open", this);
                },
                /**
                 * save file
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                save: function(editor) {
                    operation.open("#save", this);
                },
                /**
                 * export HTML
                 * @method function
                 * @param  {mdeditor} editor editor entity
                 */
                exportHTML: function(editor) {
                    operation.open("#exportHTML", this);
                },
                "changetheme": function() {
                    var icon = this.toolbar.find('.fa[name=changetheme]');
                    if (icon.hasClass('fa-moon-o')) {
                        operation.setTheme(this, "default");
                        icon.removeClass('fa-moon-o');
                        icon.addClass('fa-sun-o');
                        icon.parent().attr("title", "日间模式");
                    } else {
                        operation.setTheme(this, "dark");
                        icon.removeClass('fa-sun-o');
                        icon.addClass('fa-moon-o');
                        icon.parent().attr('title', "夜间模式");
                    }
                }
            }
        });
    })("", "editormd");
});
