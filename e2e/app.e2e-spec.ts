import { NeilbrysonPage } from './app.po';

describe('neilbryson App', () => {
  let page: NeilbrysonPage;

  beforeEach(() => {
    page = new NeilbrysonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
