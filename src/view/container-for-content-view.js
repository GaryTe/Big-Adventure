import AbstractView from '../framework/view/abstract-view';

const createContainerForContent = () => '<ul class="trip-events__list" style="margin-top: 15px;"></ul>';

export default class ContainerForContentView extends AbstractView {

  get template() {
    return createContainerForContent();
  }

}
