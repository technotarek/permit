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

            var cPrefix = 'permit_';

            function issuePermit(permit) {
                // create the permit, give it a value of 1
                $.cookie(cPrefix+permit, 1);
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
                    $.removeCookie(cPrefix+value);
                });
            }

            function permitExists(permit){
                // if no parameter is passed to the function, set the parameter equal to the permits setting object
                permit = typeof permit !== 'undefined' ? permit : settings.permits;
                var i = 0;
                $.each($(settings.permits), function(index, value) {
                    if($.cookie(cPrefix+settings.permits[index]))
                    {
                        i++;
                    }
                });
                return i;
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

            // Iterate through user specified permits
            $.each($(settings.permits), function(index, value) {

                // hide/show appropriate content
                if($.cookie(cPrefix+settings.permits[index]))
                {
                    // if any permit exists, hide permit-less state content
                    $('.permit-none').hide();
                    // if any permit exists, show globally permitted state content
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

            // check to see if any permits exist, if not...
            if(permitExists()<1){

                // show public content
                $('.permit-none').show();

                // show forced message content based on data-permit-message attribute
                $('.permit-force').each(function() {
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

    };

})(jQuery);

