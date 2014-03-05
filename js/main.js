$(document).ready(function()
{
    $.permit(
        {
            permits: ['free','premium','admin'],
            reissueDestination: 'reload'        }
    );
});
