var markdownEditor;
$(function() {
global.window = window;
global.gui = require('nw.gui');
global.$=$;
global.fileName="";
var os=require('os');
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
            // syncScrolling : false,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            //watch : false,                // 关闭实时预览
            htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: false, // Using [TOCM]
            tex: true, // 开启科学公式TeX语言支持，默认关闭
            flowChart: true, // 开启流程图支持，默认关闭
            sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
            dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            onload: function() {
                console.log('onload', this);
                this.fullscreen();
                var saveKeyMap = {
                    "Ctrl-S": function(cm) {
                        menu.open("#save",markdownEditor);
                    },
                    "Ctrl-O":function (cm) {
                        menu.open("#open",markdownEditor);
                    },
                    "Shift-Ctrl-S":function (cm) {
                        menu.open("#saveas",markdownEditor);
                    },
                    "Shift-Ctrl-O":function (cm) {
                        menu.open("#exportHTML",markdownEditor);
                    }
                };

                this.addKeyMap(saveKeyMap);
            }
        });
    })("", "editormd");

    $("#goto-line-btn").bind("click", function() {
        markdownEditor.gotoLine(90);
    });

    $("#show-btn").bind('click', function() {
        markdownEditor.show();
    });

    $("#hide-btn").bind('click', function() {
        markdownEditor.hide();
    });

    $("#get-md-btn").bind('click', function() {
        alert(markdownEditor.getMarkdown());
    });

    $("#get-html-btn").bind('click', function() {
        alert(markdownEditor.getHTML());
    });

    $("#watch-btn").bind('click', function() {
        markdownEditor.watch();
    });

    $("#unwatch-btn").bind('click', function() {
        markdownEditor.unwatch();
    });

    $("#preview-btn").bind('click', function() {
        markdownEditor.previewing();
    });

    $("#fullscreen-btn").bind('click', function() {
        markdownEditor.fullscreen();
    });

    $("#show-toolbar-btn").bind('click', function() {
        markdownEditor.showToolbar();
    });

    $("#close-toolbar-btn").bind('click', function() {
        markdownEditor.hideToolbar();
    });

    $("#toc-menu-btn").click(function() {
        markdownEditor.config({
            tocDropdown: true,
            tocTitle: "目录 Table of Contents",
        });
    });

    $("#toc-default-btn").click(function() {
        markdownEditor.config("tocDropdown", false);
    });
});
