const SetActiveTabMenu = menuElement => {
    $('.main-menu-item').removeClass('active')
    $(`.${menuElement}-menu-item`).addClass('active')
}

function ParametroURL(_a){return decodeURIComponent((new RegExp("[?|&]"+_a+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}  
