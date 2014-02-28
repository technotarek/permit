$(document).ready(function()
{
    $.permit(
        {
            permits: ['free','premium','admin'],
            reissueDestination: 'reload',
            revokeDestination: 'http://' + window.location.hostname + '/permit.html'
        }
    );
});
