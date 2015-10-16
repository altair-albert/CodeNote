/**
 * toast success message
 * @method function
 * @param  {string} msg message
 */
exports.success = function(msg) {
    $.amaran({
        message: msg,
        position: 'top right',
        inEffect: 'slideBottom'
    });
};
/**
 * toast error message
 * @method function
 * @param  {string} msg message
 */
exports.error = function(msg) {
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
