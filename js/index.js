var language;
var semantic;

var more; // for clicking "more"

var LIST_LIMIT = 5;

function makeRecord() {
    $.post('php/makeRecord.php', {'language': language, 'semantic': semantic});
}

function setLanguage(newLanguage) {
    language = newLanguage;
}

function setSemantic(newSemantic) {
    semantic = newSemantic;
}

function drawFig(htmlContainer, filename) {
    var fig = $('<img></img>');
    fig.attr('src', filename);
    htmlContainer.html(fig);
}

function setPlaceholder(someHtml) {
    if(someHtml.val() == '' && someHtml.attr("placeholder")!="") {
        someHtml.val(someHtml.attr("placeholder"));
        someHtml.focus(function() {
            if(someHtml.val() == someHtml.attr("placeholder"))
                someHtml.val("");
        });
        someHtml.blur(function() {
            if(someHtml.val() == "")
                someHtml.val(someHtml.attr("placeholder"));
        });
    }
}

function loadList(phpGetList, htmlList, setValue, type) {
    $.post(phpGetList, function(data) {
        setValue(data[0]);
        fillList(data, htmlList, setValue, type, LIST_LIMIT);
        htmlList.hide();
        drawCode();
    }, "json");
}

function fillList(list, htmlList, setValue, type, listLimit) {
    htmlList.css('background', '#AAD0FF');
    for(var idx in list) {
        var item = $('<li></li>');
        item.hover(function() {
            $(this).css('cursor', 'pointer');
            $(this).css('background', '#0066E3');
        }, function() {
            $(this).css('cursor', 'auto');
            $(this).css('background', '');
        });
        htmlList.append(item);
        
        if(listLimit != -1 && parseInt(idx) >= listLimit) {
            drawFig(item, 'fig/main/more.png');
            item.click(function() {
                htmlList.html('');
                fillList(list, htmlList, setValue, type, -1);
                more = true;
            });
            break;
        } else {
            drawFig(item, 'fig/' + type + '/small/' + list[idx] + '.png');
            item.attr('name', list[idx]);        
            item.click(function() {
                setValue($(this).attr('name'));
                htmlList.hide();
                drawCode();
                makeRecord();
            });
        }
    }
}

function initSelect(htmlSelect, thisHtmlList, otherHtmlList) {
    htmlSelect.hover(function() {
        $(this).css('cursor', 'pointer');
        thisHtmlList.show('fast');
        otherHtmlList.hide('fast');
    }, function() {
        $(this).css('cursor', 'auto');
    });
}

function drawCode() {
    if(language != undefined)
        drawFig($('#languageShow'), 'fig/language/big/' + language + '.png');
    else
        return;
    if(semantic != undefined)
        drawFig($('#semanticShow'), 'fig/semantic/big/' + semantic + '.png');
    else
        return;
    
    $.post('php/getCode.php', {'language': language, 'semantic': semantic}, function(data) {
        if(data != '' && data != '\n') {
            $('#codeShow').html(data);
            $('#codeShow').show();
            toggleProvide(false);
        } else {
            $('#codeShow').hide();
            toggleProvide(true);
        }
    });
}

function cancelSelect(div, list1, list2) {
    div.click(function() {
        if(!more) {
            list1.hide('fast');
            list2.hide('fast');
        }
        more = false;
    });
}

function toggleProvide(visible) {
    if(visible) {
        $('#provideWords').show();
        $('#provideName').show();
        $('#codeProvide').show();
        $('#buttonProvide').show();
    } else {
        $('#provideWords').hide();
        $('#provideName').hide();
        $('#codeProvide').hide();
        $('#buttonProvide').hide();
    }
}

function addProvideHtml() {
    var provideWords = $('<img />');
    provideWords.attr('id', 'provideWords');
    provideWords.attr('src', 'fig/main/notyet.png');
    provideWords.hide();
    $('#codeContent').append(provideWords);
    $('#codeContent').append('<br>');

    var provideName = $('<input></input>');
    provideName.attr('id', 'provideName');
    provideName.attr('type', 'text');
    provideName.attr('placeholder', '您的大名');
    setPlaceholder(provideName);
    provideName.hide();
    $('#codeContent').append(provideName);
    $('#codeContent').append('<br>');

    var codeProvide = $('<textarea></textarea>');
    codeProvide.attr('id', 'codeProvide');
    codeProvide.attr('cols', 40);
    codeProvide.attr('rows', 15);
    codeProvide.attr('placeholder', '您生猛的扣的');
    setPlaceholder(codeProvide);
    codeProvide.hide();
    $('#codeContent').append(codeProvide);
    $('#codeContent').append('<br>');

    var buttonProvide = $('<img />');
    buttonProvide.attr('id', 'buttonProvide');
    buttonProvide.attr('src', 'fig/main/provide.png');
    buttonProvide.hide();
    $('#codeContent').append(buttonProvide);
}

function setProvideFunction() {
    $('#buttonProvide').click(function() {
        $.post('php/addUserCode.php', {
            'provider': $('#provideName').val(), 
            'language': language, 
            'semantic': semantic, 
            'code': $('#codeProvide').val()
        }, function() {
            if($('#codeProvide').val().replace(/\s/g, '') == $('#codeProvide').attr('placeholder'))
                alert('您還沒寫扣呀');
            else {
                alert('謝謝您!!');
                $('#codeProvide').val($('#codeProvide').attr("placeholder"));
                drawCode();
            }
        });
    });

    $('#buttonProvide').hover(function() {
        $(this).css('cursor', 'pointer');
    }, function() {
        $(this).css('cursor', 'auto');
    });
}

function initProvide() {
    addProvideHtml();
    setProvideFunction();
}

$(function() {
    more = false;

    loadList('php/getLanguage.php', $('#languageList'), setLanguage, 'language');
    loadList('php/getSemantic.php', $('#semanticList'), setSemantic, 'semantic');

    initSelect($('#languageSelect'), $('#languageList'), $('#semanticList'));
    initSelect($('#semanticSelect'), $('#semanticList'), $('#languageList'));

    cancelSelect($('#bodyDiv'), $('#languageList'), $('#semanticList'));

    initProvide();

});
