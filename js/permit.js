/*
* Permit.js
* @version		0.1
* @copyright	Tarek Anandan (http://www.technotarek.com)
*/
;(function($) {

    var settings;
    $.permit = function(options){
        settings = jQuery.extend({
            permits: ['admin'], // value: array permit levels, default to admin; sets the available permission levels
            issueDestination: 'reload',
            revokeDestination: 'http://'+window.location.hostname
        },options);

        $(document).ready(function() {

            function issuePermit(permit) {
                // create the permit, give it a value of 1
                $.cookie(permit, 1);
                // either reload the page or redirect to location based on user settings
                if(settings.issueDestination === 'reload')
                {
                    window.location.reload();
                }else
                {
                    window.location.href = settings.issueDestination;
                }
            }

            function revokeAllPermits(permits){
                $.each($(permits), function(index, value) {
                    $.removeCookie(value);
                });
            }

            // hide default permits
            $('.permit-all, .permit-force').hide();

            // hide user specified permits
            $.each($(settings.permits), function(index, value) {
                $('.permit-'+value).hide();
            });

            // Issue default permit
            $('.permit-issue').on('click', function()
            {
                issuePermit(settings.permits[0]);
            });

            // Iterate through permits and hide/show appropriate content
            $.each($(settings.permits), function(index, value) {
                if($.cookie(settings.permits[index]))
                {
                    $('.permit-none').hide();
                    $('.permit-all').show();
                    // hide all permit content except selected permits
                    for(var i=0;i<settings.permits.length;i++)
                    {
                        if(i!=index)
                        {
                            $('.permit-'+value).hide();
                        }
                    }
                    // show permitted content
                    $('.permit-'+value).show();
                }
            });

            // if no permits exist...
            if($.isEmptyObject($.cookie())){
                $('.permit-none').show();

                // show forced message based on data-permit-message attribute
                $('.permit-force').each(function(i, obj) {
                    var message = $(this).data('permit-message');
                    $(this).html(message).show();
                });
            }

            // permit
            $('#permit-reissue').on('click',function(){

                // remove all existing permits
                revokeAllPermits(settings.permits);

                // determine selected permit
                var permit = $('#permit-options').val();

                // issue new permit
                issuePermit(permit);

            });

            // revoke all permits and redirect
            $('.permit-revoke').click(function()
            {
                revokeAllPermits(settings.permits);
                window.location.href = settings.revokeDestination;
            });

        });

    }

})(jQuery);

