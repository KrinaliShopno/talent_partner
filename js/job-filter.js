/* ========================================================
   Job Filter & Search Functionality - Talent Partner
======================================================== */
(function ($) {
    'use strict';

    function getQueryParams() {
        var params = {};
        var search = window.location.search.substring(1);
        if (search) {
            var pairs = search.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                params[decodeURIComponent(pair[0])] = decodeURIComponent((pair[1] || '').replace(/\+/g, ' '));
            }
        }
        return params;
    }

    function filterJobListings() {
        var keyword = $.trim($('#job-keyword-input').val() || '').toLowerCase();
        var category = $.trim($('#job-category-select').val() || '').toLowerCase();
        var location = $.trim($('#job-location-input').val() || '').toLowerCase();

        var $jobCards = $('.twm-jobs-grid-style1, .twm-jobs-list-style1').closest('.col-lg-6, .col-md-12, .masonry-item');
        var matchCount = 0;
        var totalCount = $jobCards.length;

        $('#job-search-alert').remove();

        if (!keyword && (!category || category === 'all category') && !location) {
            $jobCards.show();
            $('.woocommerce-result-count-left').text('Showing all ' + totalCount + ' jobs');
            return;
        }

        $jobCards.each(function () {
            var $card = $(this);
            var title = $card.find('.twm-job-title, h3').text().toLowerCase();
            var loc = $card.find('.twm-job-address').text().toLowerCase();
            var fullText = $card.text().toLowerCase();

            var matchesKeyword = true;
            if (keyword) {
                matchesKeyword = (title.indexOf(keyword) !== -1 || fullText.indexOf(keyword) !== -1);
            }

            var matchesCategory = true;
            if (category && category !== 'all category') {
                matchesCategory = (title.indexOf(category) !== -1 || fullText.indexOf(category) !== -1);
            }

            var matchesLocation = true;
            if (location) {
                matchesLocation = (loc.indexOf(location) !== -1 || fullText.indexOf(location) !== -1);
            }

            if (matchesKeyword && matchesCategory && matchesLocation) {
                $card.show();
                matchCount++;
            } else {
                $card.hide();
            }
        });

        var displayTerm = keyword || category || location;

        if (matchCount === 0) {
            $jobCards.show(); // Keep visible so user isn't stuck with empty screen
            var noMatchHtml = '<div id="job-search-alert" class="col-12 mb-4">' +
                '<div class="alert alert-warning d-flex justify-content-between align-items-center" role="alert" style="border-radius: 8px;">' +
                '<span><i class="fa fa-info-circle me-2"></i>No exact vacancies found matching "<strong>' + $('<div/>').text(displayTerm).html() + '</strong>". Showing all available jobs below:</span>' +
                '<a href="job.html" class="btn btn-sm btn-outline-dark" style="border-radius: 20px;">View All Jobs</a>' +
                '</div></div>';
            $('#job-listings-container').prepend(noMatchHtml);
            $('.woocommerce-result-count-left').text('Showing all ' + totalCount + ' jobs');
        } else {
            var matchHtml = '<div id="job-search-alert" class="col-12 mb-4">' +
                '<div class="alert alert-info d-flex justify-content-between align-items-center" role="alert" style="border-radius: 8px; background: #eef5ff; border-color: #bcd4f5; color: #004b99;">' +
                '<span><i class="fa fa-search me-2"></i>Found <strong>' + matchCount + '</strong> job vacancy(ies) matching "<strong>' + $('<div/>').text(displayTerm).html() + '</strong>"</span>' +
                '<a href="job.html" class="btn btn-sm btn-outline-primary" style="border-radius: 20px;">Clear Filter</a>' +
                '</div></div>';
            $('#job-listings-container').prepend(matchHtml);
            $('.woocommerce-result-count-left').text('Showing ' + matchCount + ' of ' + totalCount + ' jobs');
        }
    }

    $(document).ready(function () {
        var queryParams = getQueryParams();
        var initialQuery = queryParams.q || queryParams.keyword || '';
        var initialLoc = queryParams.location || '';

        if (initialQuery) {
            $('#job-keyword-input').val(initialQuery);
        }
        if (initialLoc) {
            $('#job-location-input').val(initialLoc);
        }

        if (initialQuery || initialLoc) {
            filterJobListings();
        }

        // Search trigger events
        $('#job-keyword-input').on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                filterJobListings();
            }
        });

        $('#job-keyword-btn').on('click', function (e) {
            e.preventDefault();
            filterJobListings();
        });

        $('#job-location-input').on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                filterJobListings();
            }
        });

        $('#job-location-btn').on('click', function (e) {
            e.preventDefault();
            filterJobListings();
        });

        $('#job-category-select').on('change', function () {
            filterJobListings();
        });
    });

})(jQuery);
