"use babel";

class MyMenu {
  constructor() {
    menuCalled += 1;
  }
}

class MyMenuItem {
  constructor(conf) {
    this.label = conf.label;
    this.click = conf.click;
  }
}

let Menu = MyMenu;

Menu.prototype.listReturn = [];
Menu.prototype.append = jest.genMockFn();
Menu.prototype.append.mockImplementation(function(menuItem) {
  listReturn.push(menuItem);
  this.listReturn.push(menuItem);
});
Menu.prototype.popup = jest.genMockFn();
Menu.prototype.popup.mockImplementation(function() {
  return this.listReturn;
});
Menu.prototype.reset = jest.genMockFn();
Menu.prototype.reset.mockImplementation(function() {
  this.listReturn = [];
  listReturn = [];
  menuCalled = 0;
});

let menuCalled = 0;

let listReturn = [];

function resetMenu() {
  menuCalled = 0;
  listReturn = [];
}

module.exports = {
  require: tag => {
    if (tag === "menu") {
      return Menu;
    } else {
      return MyMenuItem;
    }
  },
  getCurrentWindow: () => {
    return true;
  },
  getMenuCalledNumber() {
    return menuCalled;
  },
  getListReturn() {
    return listReturn;
  },
  resetMenu() {
    resetMenu();
  },
  Menu: Menu,
  MenuItem: MyMenuItem,
};
