describe('E2E: Templates', function() {

  it('should display the front page', function() {
    browser().navigateTo('/');
    expect(element('body.front').html()).toContain('#main-content');
  });

  it('should display the front page', function() {
    browser().navigateTo('/home#/login');
    expect(element('div.navbar-search').html()).toContain('What can monimus');
  });

});
