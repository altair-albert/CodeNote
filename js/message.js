var message = {
    unknow: '未知操作',
    success: '操作成功',
    error: '操作失败',
    savefile:{
        error:"保存文件失败",
        success:"保存文件成功"
    },
    openfile: {
        error: "打开文件失败",
        success: "打开文件成功"
    },
    exportHTML: {
        error: "导出HTML失败",
        success: "导出HTML成功"
    }
}

/**
 * choose message of item
 * @method function
 * @param  {string or object} item first item
 * @param  {string} attr    second item
 * @return {string}     description of this item
 */
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
