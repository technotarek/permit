$(document).ready(function()
{
    $.permit(
        {
            permits: ['free','premium','admin'],
            issueDestination: 'reload',
            revokeDestination: 'http://' + window.location.hostname + '/permit.html'
        }
    );
});
