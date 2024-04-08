import Route from '@ember/routing/route';

export default class ContactsContactRoute extends Route {
  async model(params) {
    const contactId = params.contact_id;
    let contactResponse = await fetch(`/user/${contactId}`);
    let contact = await contactResponse.json();
    return contact;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.setProperties({
      userId1: sessionStorage.getItem('currentUser'),
      userId2: model.id,
    });
  }
}
