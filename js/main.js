$(document).ready(function()
{
    $.permit(
        {
            permits: ['free','premium','admin'],
            issueDestination: 'dashboard.html',
            revokeDestination: 'http://' + window.location.hostname + '/permit.html'
        }
    );
});
