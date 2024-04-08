import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name() {
    return faker.person.firstName();
  },

  mobileNo() {
    return faker.phone.number();
  },

  emailId() {
    return faker.internet.email({ firstName: this.name });
  },

  profileImg() {
    return faker.image.avatarGitHub();
  },
});
