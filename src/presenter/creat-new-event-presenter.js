import ButtonNewEventView from '../view/button-new-event-view';
import FormAddNewPointViwe from '../view/form-add-new-point-viwe';
import {
  render,
  replace,
  remove,
  RenderPosition
} from '../framework/render';
import { Mode } from '../const';

export default class CreatNewEventPresenter {
  #button = null;
  #buttonNewEventContainer = null;
  #containerForContent = null;
  #handleRedootPage = null;
  #handleRecordNewWaypoint = null;
  #formAddNewPoint = null;
  #mode = Mode.DEFAULT;

  constructor(
    buttonNewEventContainer,
    containerForContent,
    onRedootPage,
    onRecordNewWaypoint,
  ) {
    this.#buttonNewEventContainer = buttonNewEventContainer;
    this.#containerForContent = containerForContent;
    this.#handleRedootPage = onRedootPage;
    this.#handleRecordNewWaypoint = onRecordNewWaypoint;
  }

  init(indicatorButton = Mode.DEFAULT) {
    const prevButton = this.#button;

    this.#button = new ButtonNewEventView(
      indicatorButton,
      this.#openFormAddNewPoint
    );

    if(prevButton === null) {
      render(this.#button, this.#buttonNewEventContainer);
      return;
    }

    replace(this.#button, prevButton);

    remove(prevButton);
  }


  #destroy() {
    remove(this.#formAddNewPoint);
    document.removeEventListener('keydown', this.#closeFormAddNewPoint);
    this.init();
    this.#mode = Mode.DEFAULT;
  }

  #creatFormAddNewPoint = () => {
    this.#formAddNewPoint = new FormAddNewPointViwe(
      this.closeOpenFormAddNewPoint,
      this.#handleRecordNewWaypoint
    );
    render(this.#formAddNewPoint, this.#containerForContent.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#closeFormAddNewPoint);
    this.#mode = Mode.EDITING;
  };


  #openFormAddNewPoint = (indicatorButton) => {
    this.init(indicatorButton);
    this.#handleRedootPage();
    this.#creatFormAddNewPoint();
  };


  #closeFormAddNewPoint = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      this.#destroy();
    }
  };

  closeOpenFormAddNewPoint = () => {
    if(this.#mode === Mode.EDITING) {
      this.#destroy();
    }
  };
}
