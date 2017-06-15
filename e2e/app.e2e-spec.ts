import { LoaderPage } from './app.po';

describe('loader App', () => {
  let page: LoaderPage;

  beforeEach(() => {
    page = new LoaderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
