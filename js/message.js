var message = {
    unknow: '未知操作',
    success: '操作成功',
    error: '操作失败',
    openfile: {
        error: "打开文件失败",
        success: "打开文件成功"
    },
    exportHTML: {
        error: "导出HTML失败",
        success: "导出HTML成功"
    }
}


exports.msg = function(item, attr) {
    var msg = message[item];
    if (typeof attr != 'undefined' && typeof msg == 'object') {
        msg = msg[attr];
    }
    if (typeof msg == 'undefined') {
        return message['unknow'];
    } else {
        return msg;
    }
}
