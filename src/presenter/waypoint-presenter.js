import ContentView from '../view/content-view';
import FormEditPointView from '../view/form-edit-point-view';
import {
  replace,
  render,
  remove
} from '../framework/render';
import { Mode } from '../const';

export default class WaypointPresenter {
  #rout = null;
  #containerForContent = null;
  #content = null;
  #formEditPoint = null;

  #mode = Mode.DEFAULT;
  #handleModeChange = null;
  #handleAction = null;


  constructor(containerForContent, onCloseFormEditPoint, onAction) {
    this.#containerForContent = containerForContent;
    this.#handleModeChange = onCloseFormEditPoint;
    this.#handleAction = onAction;
  }

  init(waypoint) {
    this.#rout = waypoint;

    const prevContent = this.#content;
    const prevFormEditPoint = this.#formEditPoint;

    this.#content = new ContentView(
      this.#rout,
      () => {
        this.#replaceWaypointToFormEditPoint();
        document.addEventListener('keydown', this.#closeFormEditPoint);
      }
    );

    this.#formEditPoint = new FormEditPointView(
      this.#rout,
      () => {
        this.#replaceFormEditPointToWaypoint();
      },
      this.#handleAction
    );

    if (prevContent === null || prevFormEditPoint === null) {
      render(this.#content, this.#containerForContent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#content, prevContent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditPoint, prevFormEditPoint);
    }

    remove(prevContent);
    remove(prevFormEditPoint);
  }


  destroy() {
    remove(this.#content);
    remove(this.#formEditPoint);
  }


  #closeFormEditPoint = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      this.#replaceFormEditPointToWaypoint();
    }
  };

  #replaceWaypointToFormEditPoint = () => {
    replace(this.#formEditPoint, this.#content);
    document.addEventListener('keydown', this.#closeFormEditPoint);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormEditPointToWaypoint = () => {
    if(this.#formEditPoint.mode === Mode.NO_SAVE) {this.#formEditPoint.reset();}
    replace(this.#content, this.#formEditPoint);
    document.removeEventListener('keydown', this.#closeFormEditPoint);
    this.#mode = Mode.DEFAULT;
  };

  closeOpenFormEditPoint = () => {
    if(this.#mode === Mode.EDITING) {
      this.#replaceFormEditPointToWaypoint();
    }
  };
}
