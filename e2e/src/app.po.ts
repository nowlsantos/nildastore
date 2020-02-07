import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
<<<<<<< HEAD
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
=======
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
>>>>>>> e20b0b2c12cc6e6a7eeb1248a52f702c0c50c3e7
  }
}
