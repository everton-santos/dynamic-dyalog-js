
/*  Copyright 2013  EVERTON_SANTOS  (email : everton.mailbox@gmail.com)
	https://github.com/everton-santos/dynamic-dyalog-js

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

(function ($) {
    $.fn.DynamicDialog = function (options) {
        var defaults = {
        };
        var settings = $.extend({}, defaults, options);
        return this.each(function () {

            $('body').prepend(GetDialogContent());
            InicialAnimation();
            SetBackgroundHeigth();
            var url = this.getAttribute("href");
            if (url.length > 0) {
                $.ajax({
                    url: url,
                    cache: false
                })
                .fail(function(){
                	location.reload();
                })
                .done(function (html) {
                    $('.dynamic-dialog-body').html(html);
                    ManageCenterContent();
                    $(".dynamic-dialog-link").click(function (e) {
                        e.preventDefault();
                        $(this).DynamicDialog();
                    });
                });
            }
            else {
                $('.dynamic-dialog-body').append("<h1>Opps not found url!!</h1>");
            }
        });
    };
})(jQuery);

function HideBody()
{

}


function InicialAnimation() {
    $(".dynamic-dialog-background").animate({ "opacity": 1 }, 700);
}


function GetDialogContent() {
    var content = "<div class='dynamic-dialog'>" +
      "<div class='dynamic-dialog-background'>" +
         "<div class='dynamic-dialog-content'>" +
            " <div class='dynamic-dialog-header'>" +

             "</div>" +
            " <div class='dynamic-dialog-body'> <div style='margin:0 auto; text-align:center'><img style='width:50px' src='/images/loading.gif' /></div> " +

             "</div>" +
         "</div>" +
        "</div>" +
     "</div>";

    return content;
}


function SetBackgroundHeigth() {
    $(".dynamic-dialog-background").css("height", $(document).height());
    $(window).resize(function () {
        $(".dynamic-dialog-background").css("height", $(document).height());
    });
    $(window).scroll(function () {
        $(".dynamic-dialog-background").css("height", $(document).height());
    });
}

function ManageCenterContent() {
    SetMargin();
    $(document).scroll(function () {
        marginTop = (($(window).height() - $('.dynamic-dialog-content').height()) / 2) + $(document).scrollTop();

        $(".dynamic-dialog-content").css("margin-bottom", "").stop().animate({ "margin-top": marginTop }, 500);
    });
    $(window).resize(function () {
        marginTop = (($(window).height() - $('.dynamic-dialog-content').height()) / 2) + $(document).scrollTop();

        $(".dynamic-dialog-content").css("margin-bottom", "").stop().animate({ "margin-top": marginTop }, 500);
    });
}

function SetMargin() {

    if ($(window).height() <= $('.dynamic-dialog-content').height() + 100) {
        percent = 10;
        if ($(document).scrollTop() >= ($('.dynamic-dialog-content').height() + 10)) {
            topPosition = 0;
            $(".dynamic-dialog-content").css("margin-top", "").stop().animate({ "margin-bottom": 10 }, 500);
            return;
        }
    }
    else {
        percent = 15;

        topPosition = $(document).scrollTop();
    }

    var pixelsByPercent = ($(window).height() * percent) / 100;
    marginTop = topPosition + pixelsByPercent;

    $(".dynamic-dialog-content").css("margin-bottom", "").stop().animate({ "margin-top": marginTop }, 500);

}