$(document).ready(function () {
    $('.add-comments-button').on('click', function () {
        var articleId = $(this).data('id');
        var url = window.location.origin;
        var formName = 'form-add-' + articleId;
        var form = $('#' + formName);

        $.ajax({
                url: baseURL + '/add/comment/' + articleId,
                type: 'POST',
                data: form.serialize(),
            })
            .done(function () {
                location.reload();
            });
        return false;
    });
});
$('.delete-comment-button').on('click', function () {
    var commentsId = $(this).data("id");
    var url = window.location.origin;
    $.ajax({
            url: url + '/remove/comments/' + commentsId,
            type: 'POST',
        })
        .done(function () {
            location.reload();
        });
    return false;
});