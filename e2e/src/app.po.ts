import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getElementById(elementId: string) {
    return element(by.id(elementId));
  }

  clickElementById(elementId: string) {
    this.getElementById(elementId).click();
  }

  isElementEnabledFindById(elementId: string) {
    return this.getElementById(elementId).isEnabled();
  }

  isElementDisplayedFindById(elementId: string) {
    return this.getElementById(elementId).isDisplayed();
  }

  getElementTextFindById(elementId: string) {
    return this.getElementById(elementId).getText();
  }
}
