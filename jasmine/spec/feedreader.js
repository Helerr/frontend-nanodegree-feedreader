/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //testing suite for RSS feed
    describe('RSS Feeds', function() {
        //making sure that all feeds are defined and they are not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //making sure that all feeds have the URL is defined and it's not empty
        it('has a URL defined and it is not empty', function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe(0);
            });
        });

        //making sure that all feeds have a name defined and it's not empty
        it('has a name defined and it is not empty', function() {
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe(0);
            });
        });
    });


    //testing suite for the menu
    describe('The menu', function() {

        //making sure that the menu is hidden when the page loads initially
        it('has the menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // ref: https://api.jquery.com/hasclass/
        });

         //making sure that the menu shows on click and hides when clicked again
         it('menu hides and unhides on click', function() {
            $('a.menu-icon-link').trigger('click'); // show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide menu again
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    //testing suit for the initial entries
    describe('Initial Entries', function() {


        beforeEach(function(finished) {
            loadFeed(0, function(){
              finished();
            });
        });
        //testing that there is at least one entry in the feed
        it('has an entry after completion', function(finished) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            finished();
        });
    });

    //testing suite for new feed selection
    describe('New Feed Selection', function() {

        //beforeEach to wait for the async call to finish
        var oldFeed;
        beforeEach(function(finished) {
            loadFeed(0, function() {
                var oldFeed = $('.feed').html();
                loadFeed(1, function(){
                  finished();
                });

            });
        });
        //making sure that the new loaded content is different from the previous one
        it('loads a new feed', function(finished) {
          var newFeed = $('.feed').html();
            expect($(newFeed)).not.toBe(oldFeed);
            finished();
        });
    });
}());
