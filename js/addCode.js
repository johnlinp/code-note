var language;
var semantic;

function setLanguage(newLanguage) {
    language = newLanguage;
}

function setSemantic(newSemantic) {
    semantic = newSemantic;
}

function loadList(phpGetList, htmlList, setValue, type) {
    $.post(phpGetList, function(data) {
        setValue(data[0]);
        fillList(data, htmlList, setValue, type);
        drawCode();
    }, "json");
}

function fillList(list, htmlList, setValue, type) {
    for(var idx in list) {
        var item = $('<option></option>');
        if(idx == 0) {
            item.attr('selected', 'true');
        }
        item.html(list[idx]);
        item.val(parseInt(idx) + 1);
        htmlList.append(item);
    }
    htmlList.click(function() {
        htmlList.children().each(function() {
            if($(this).attr('selected'))
                setValue($(this).html());
        });
        drawCode();
    });
}

function drawCode() {
    $.post('php/getCode.php', {'language': language, 'semantic': semantic}, function(data) {
        $('#codeShow').html(data);
    });
}

// main function
$(function() {
    loadList('php/getOrderLanguage.php', $('#languageList'), setLanguage, 'language');
    loadList('php/getOrderSemantic.php', $('#semanticList'), setSemantic, 'semantic');
});
