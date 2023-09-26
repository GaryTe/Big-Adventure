import AbstractView from '../framework/view/abstract-view';

const createContainerForContent = () => '<ul class="trip-events__list"></ul>';

export default class ContainerForContentView extends AbstractView {

  get template() {
    return createContainerForContent();
  }

}
