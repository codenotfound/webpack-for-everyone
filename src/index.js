import notification from './Notification';
import anime from './images/anime.jpg';

console.log(notification);
// notification.notify('Here is my message');
notification.log('Here is my message');
notification.announce('Here is my message');

class Form {
    constructor() {
        console.log('test')
        this.test();
    }
    test() {
        console.log('hey from test');
    }
}

new Form();