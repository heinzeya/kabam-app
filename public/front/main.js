jQuery(document).ready(function($) {
  console.log('ready');

  if ($('.alert-error').length) {
    console.log('dropdown executed', $('.alert-error').length);
    $('#block-bconfig-bootstrap-login .dropdown-toggle').click();
  }

  $('#edit-submit').click(function() {
    var form = $('#user-login');
    form.submit();
  });

  $('body .navbar .btn').on('click', function() {
    if (!$('.nav-collapse').hasClass('collapse'))
      $('.nav-collapse').addClass('collapse');
    else
      $('.nav-collapse').removeClass('collapse');

    refreshMenuPostion(true);
    return false;
  });

  $('input[type="text"], input[type="password"], textarea').each(function() {
    var placeholder = $(this).attr('data-placeholder');
    if (!placeholder) {
      return true;
    }

    this.type = 'text';
    $(this).val(placeholder);
    return true;
  });

  $('input[type="text"], input[type="password"], textarea').live('focus', function() {
    var placeholder = $(this).attr('data-placeholder');
    if (!placeholder)
      return true;
    this.value = (this.value == placeholder?'':this.value);

    if ($(this).attr('data-input-type') == 'password') {
      this.type = 'password';
    }
    return true;
  }).live('blur', function() {
    var placeholder = $(this).attr('data-placeholder');
    if (!placeholder)
      return true;

    if ($(this).attr('data-input-type') == 'password' && this.value == '') {
      this.type = 'text';
    }

    this.value = (this.value == ''?placeholder:this.value);
    return true;
  });

  if ($('body').hasClass('logged-in') || !$('body').hasClass('front'))
    return true;

  var currentBlock = '';
  var scrollLocked = false;
  var animationScrollDelay = 1500;

  // Preventing from spam mail
  $('#frontpage-contacts-hidden-prevent-field').parent().html('');
  $('#frontpage-contacts .contact-form').submit(function() {

    $(this).find('input[type="text"], textarea').each(function() {
      if (!$(this).attr('data-placeholder'))
        return true;

      if (this.value == $(this).attr('data-placeholder')) {
        this.value = '';
      }
      return true;
    });

    $('#contact-form-message').slideUp();

    var data = $(this).serialize();

    $(this).find('input[type="text"], textarea').each(function() {
      if (!$(this).attr('data-placeholder'))
        return true;

      if (this.value == '') {
        this.value = $(this).attr('data-placeholder');
      }
      return true;
    });

    var instance = this;
    $.ajax({
      'url': $(this).attr('action'),
      'data': data,
      'type': 'post',
      'dataType': 'json',
      'success': function(response) {
        $('#contact-form-message').html(response['message']);
        $('#contact-form-message').slideDown();

        if (response['success']) {

          $(instance).find('input[type="text"], textarea').each(function() {
            if (!$(this).attr('data-placeholder'))
              return true;
            this.value = $(this).attr('data-placeholder');
            return true;
          });

          window.setTimeout(function() {
            $('#contact-form-message').slideUp();
          }, 3000);
        }
      }
    });
    return false;
  });

  refreshMenuPostion();

  function moveTopMenuHover(_this, callback) {

    if ($(_this).parent().parent().hasClass('block-main-menu')) {
      $(_this).parent().parent().find('li').removeClass('active');
      $(_this).parent().addClass('active');
    } else {
      $(_this).parent().find('a').removeClass('active');
      $(_this).addClass('active');
    }

    return;

    var left = $('.nav-collapse.collapse').position().left + 1 * $(_this).position().left + 1 * ($(_this).width() - $('#menu_hover').width()) / 2 + 20;

    $('#menu_hover').clearQueue();
    $('#menu_hover').stop();

    $('#menu_hover').animate(
      {
        left: left + 'px'
      },
      {
        duration: animationScrollDelay,
        queue: false,
        specialEasing: {
          left: "easeOutBounce"
        },
        complete: function() {
          if (arguments.length == 2 && typeof callback == 'function')
            callback();
        }
      }
    );
  }

  function refreshMenuPostion() {
    if (!$('body').hasClass('front'))
      return true;

    var centeredPanelIDs = ['frontpage-teacher', 'frontpage-student', 'frontpage-organizations', 'frontpage-knowledge', 'frontpage-reputation', 'frontpage-connections'];

    for (var i = 0; i < centeredPanelIDs.length; i++) {
      var blockId = '#' + centeredPanelIDs[i];
      var minHeight = $(window).height() - $('#navbar .navbar-inner').height() - $('#admin-menu').height();
      var blockH = $(blockId).height();

      if (minHeight > parseInt($(blockId).css('min-height'))) {
        //$(blockId).css('min-height', minHeight + 'px');
        if (minHeight >= blockH) {
          $(blockId).css('padding-top', (minHeight - blockH) / 2 + 'px');
          $(blockId).css('padding-bottom', (minHeight - blockH) / 2 + 'px');
        }
      }
    }
    var adminH = $('#admin-menu').height();

    $('#navbar').css('top', adminH + 'px');

    var logoMH = $('#navbar .navbar-inner').height();
    var fixedWinOffsetHeight = adminH + 1 * logoMH;

    $('body').css('margin-top', fixedWinOffsetHeight + 'px');
    $('.block-secondary-menu').css('top', fixedWinOffsetHeight + 'px');
    return true;
  }

  $(window).resize(function() {
    refreshMenuPostion();
  });

  $('body.front .navbar .logo').click(function() {
    $('#frontpage-nav-bar ul.block-main-menu li a[data-target="frontpage-request-invitation"]').trigger('click');
    return false;
  });

  $('a').click(function() {
    if ($(this).attr('data-target')) {
      var fixedWinOffsetHeight = $('#navbar .navbar-inner').height() + 1 * $('#admin-menu').height();

      scrollLocked = true;
      $('html, body').animate({
        scrollTop: $("#" + $(this).attr('data-target')).offset().top - fixedWinOffsetHeight
      }, {
        duration: animationScrollDelay,
        queue: false,
        complete: function() {
          scrollLocked = false;
        }
      });

      if ($(window).width() <= 906) {
        $('body.front .navbar .btn').trigger('click');
      }

      //if ($(this).parent().parent().parent().attr('id') == 'frontpage-nav-bar') {
      if (true) {
        moveTopMenuHover(this);
      }

      return false;
    }
    return true;
  });

  $(window).scroll(function (eventData) {
    var fixedWinOffsetHeight = $('#navbar .navbar-inner').height() + 1 * $('#admin-menu').height();

    var scrollY = window.pageYOffset || document.documentElement.scollTop;

    refreshMenuPostion();

    if (scrollY <= $('#frontpage-connections').offset().top + $('#frontpage-connections').height() + parseInt($('#frontpage-connections').css('padding-top')) + parseInt($('#frontpage-connections').css('padding-bottom')) - fixedWinOffsetHeight - 2 &&
        scrollY >= $('#frontpage-start-tour').offset().top - fixedWinOffsetHeight - 2/*menu's height*/) {
      $('.block-secondary-menu').slideDown();
      if (!scrollLocked) {
        moveTopMenuHover($('#frontpage-nav-bar ul.block-main-menu li a[data-target="frontpage-start-tour"]'));
      }
    } else {
      $('.block-secondary-menu').slideUp();
    }

    if (scrollLocked)
      return true;

    $('#frontpage-nav-bar ul li a').each(function() {
      var blockId = '#' + $(this).attr('data-target');

      if (scrollY < $(blockId).offset().top + $(blockId).height() + parseInt($(blockId).css('padding-top')) + parseInt($(blockId).css('padding-bottom'))- fixedWinOffsetHeight &&
          scrollY > $(blockId).offset().top - fixedWinOffsetHeight) {
        moveTopMenuHover(this);
      }
    });

    return true;
  });

});
