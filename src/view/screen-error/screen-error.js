import AbstractView from '../../framework/view/abstract-view';
import { textRespons } from '../../const';
import './error.css';
import './error-message.css';

const createScreenError = () => `<div className="error">
  <p className="error-message">${textRespons}</p>
</div>`;

export default class ScreenError extends AbstractView {

  get template() {
    return createScreenError();
  }

  addScreenError = () => {
    document.body.append(this.element);
  };
}
