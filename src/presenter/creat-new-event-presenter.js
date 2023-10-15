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
  #points = null;

  constructor(
    buttonNewEventContainer,
    containerForContent,
    onRedootPage,
    onRecordNewWaypoint,
    points
  ) {
    this.#buttonNewEventContainer = buttonNewEventContainer;
    this.#containerForContent = containerForContent;
    this.#handleRedootPage = onRedootPage;
    this.#handleRecordNewWaypoint = onRecordNewWaypoint;
    this.#points = points;
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
      this.#handleRecordNewWaypoint,
      this.#points
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

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formAddNewPoint.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.EDITING) {

      const resetFormState = () => {
        this.#formAddNewPoint.updateElement({
          isDisabled: false,
          isSaving: false,
        });
      };

      this.#formAddNewPoint.shake(resetFormState);
    }
  }
}
