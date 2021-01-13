document.addEventListener('DOMContentLoaded', function() {
    var cleanup_video_style = document.createElement('style');

    cleanup_video_style.innerHTML = `
        .mobile-topbar-header,
        .ytp-unmute,
        .ad-container,
        .ad-div,
        .masthead-ad-control,
        .video-ads,
        .ytp-ad-progress-list,
        .companion-ad-container,
        #ad_creative_3,
        #footer-ads,
        #masthead-ad,
        #player-ads,
        .ytd-mealbar-promo-renderer,
        #watch-channel-brand-div,
        #watch7-sidebar-ads {
            display: none !important;
        }
    `;

    document.head.appendChild(cleanup_video_style);
});
