'use babel';

class MyMenu {
  constructor() {}
}

class MyMenuItem {
  constructor(label) {
    this.Label = label.label;
  }
}

const Menu = MyMenu;

Menu.prototype.listReturn = [];
Menu.prototype.flag = 0;
Menu.prototype.append = jest.genMockFn();
Menu.prototype.append.mockImplementation(function(something) {
  this.listReturn.push(something.Label);
});
Menu.prototype.popup = jest.genMockFn();
Menu.prototype.popup.mockImplementation(function(something) {
  console.log(this.listReturn);
});

module.exports = {
  require: tag => {
    if (tag == 'menu') {
      return Menu;
    } else {
      return MyMenuItem;
    }
  },
  getCurrentWindow: () => {
    return true;
  },
};
