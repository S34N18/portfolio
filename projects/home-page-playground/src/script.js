// OAuth Configuration
const oauthConfig = {
    authorizationEndpoint: 'https://your-auth-server.com/oauth2/authorize',
    tokenEndpoint: 'https://your-auth-server.com/oauth2/token',
    clientId: 'YOUR_CLIENT_ID',
    redirectUri: window.location.origin + '/callback',
    scope: 'openid profile email'
};

// Global Variables
var searchVisible = 0;
var transparent = true;
var transparentDemo = true;
var fixedTop = false;
var navbar_initialized = false;
var pk = {
    misc: {
        navbar_menu_visible: 0
    }
};

// OAuth Implementation
function initiateOAuth2Login(event) {
    if (event) {
        event.preventDefault();
    }
    const state = generateRandomState();
    localStorage.setItem('oauth_state', state);
    
    const authUrl = new URL(oauthConfig.authorizationEndpoint);
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: oauthConfig.clientId,
        redirect_uri: oauthConfig.redirectUri,
        scope: oauthConfig.scope,
        state: state
    });
    
    authUrl.search = params.toString();
    window.location.href = authUrl.toString();
}

async function handleOAuth2Callback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem('oauth_state');
    
    localStorage.removeItem('oauth_state');
    
    if (state !== storedState) {
        console.error('Invalid state parameter');
        return;
    }
    
    if (code) {
        try {
            await exchangeCodeForTokens(code);
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }
}

async function exchangeCodeForTokens(code) {
    const response = await fetch(oauthConfig.tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: oauthConfig.clientId,
            redirect_uri: oauthConfig.redirectUri
        })
    });

    if (!response.ok) {
        throw new Error('Token exchange failed');
    }

    const tokens = await response.json();
    sessionStorage.setItem('access_token', tokens.access_token);
    if (tokens.refresh_token) {
        sessionStorage.setItem('refresh_token', tokens.refresh_token);
    }
    
    window.location.href = '/dashboard';
}

function generateRandomState() {
    const array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

// Existing UI Functions
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

pk.checkScrollForPresentationPage = debounce(function() {
    oVal = ($(window).scrollTop() / 3);
    big_image.css({
        'transform':'translate3d(0,' + oVal +'px,0)',
        '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
        '-ms-transform':'translate3d(0,' + oVal +'px,0)',
        '-o-transform':'translate3d(0,' + oVal +'px,0)'
    });
}, 4);

pk.checkScrollForTransparentNavbar = debounce(function() {
    if($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
        if(transparent) {
            transparent = false;
            $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
        }
    } else {
        if(!transparent) {
            transparent = true;
            $('.navbar[color-on-scroll]').addClass('navbar-transparent');
        }
    }
}, 17);

pk.initPopovers = function() {
    if($('[data-toggle="popover"]').length != 0) {
        $('body').append('<div class="popover-filter"></div>');
        $('[data-toggle="popover"]').popover().on('show.bs.popover', function() {
            $('.popover-filter').click(function() {
                $(this).removeClass('in');
                $('[data-toggle="popover"]').popover('hide');
            });
            $('.popover-filter').addClass('in');
        }).on('hide.bs.popover', function() {
            $('.popover-filter').removeClass('in');
        });
    }
};

pk.initCollapseArea = function() {
    $('[data-toggle="pk-collapse"]').each(function() {
        var thisdiv = $(this).attr("data-target");
        $(thisdiv).addClass("pk-collapse");
    });

    $('[data-toggle="pk-collapse"]').hover(function() {
        var thisdiv = $(this).attr("data-target");
        if(!$(this).hasClass('state-open')) {
            $(this).addClass('state-hover');
            $(thisdiv).css({
                'height':'30px'
            });
        }
    },
    function() {
        var thisdiv = $(this).attr("data-target");
        $(this).removeClass('state-hover');
        if(!$(this).hasClass('state-open')) {
            $(thisdiv).css({
                'height':'0px'
            });
        }
    }).click(function(event) {
        event.preventDefault();
        var thisdiv = $(this).attr("data-target");
        var height = $(thisdiv).children('.panel-body').height();
        
        if($(this).hasClass('state-open')) {
            $(thisdiv).css({
                'height':'0px',
            });
            $(this).removeClass('state-open');
        } else {
            $(thisdiv).css({
                'height':height + 30,
            });
            $(this).addClass('state-open');
        }
    });
};

// Document Ready Handler
$(document).ready(function() {
    window_width = $(window).width();
    
    $('[data-toggle="tooltip"]').tooltip();
    
    if($('.switch').length != 0) {
        $('.switch')['bootstrapSwitch']();
    }
    if($("[data-toggle='switch']").length != 0) {
        $("[data-toggle='switch']").bootstrapSwitch();
    }
    
    if($(".tagsinput").length != 0) {
        $(".tagsinput").tagsInput();
    }
    
    if(window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');
        if(big_image.length != 0) {
            $(window).on('scroll', pk.checkScrollForPresentationPage);
        }
    }
    
    if($("#datetimepicker").length != 0) {
        $('#datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
    }
    
    pk.initPopovers();
    pk.initCollapseArea();
    
    if($('.navbar[color-on-scroll]').length != 0) {
        $(window).on('scroll', pk.checkScrollForTransparentNavbar);
    }
    
    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();
    
    $('.carousel').carousel({
        interval: 4000
    });
    
    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });
    
    // Add OAuth login button handler
    $('.btn-danger.btn-round').on('click', initiateOAuth2Login);
    
    // Check for OAuth callback
    if (window.location.search.includes('code=')) {
        handleOAuth2Callback();
    }
});

// Navbar Toggle Handler
$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);
    if(pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        setTimeout(function() {
            $toggle.removeClass('toggled');
            $('#bodyClick').remove();
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        
        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function() {
            $('html').removeClass('nav-open');
            pk.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function() {
                $toggle.removeClass('toggled');
            }, 550);
        });
        
        $('html').addClass('nav-open');
        pk.misc.navbar_menu_visible = 1;
    }
});