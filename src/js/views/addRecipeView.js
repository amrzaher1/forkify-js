import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    this.clearStatus();
  }

  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
    this.clearStatus();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));

    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  // Show status without deleting the form
  _showStatus(markup) {
    this.clearStatus();
    this._parentElement.insertAdjacentHTML('beforebegin', markup);
  }

  clearStatus() {
    this._window.querySelector('.upload-status')?.remove();
  }

  _setSubmitDisabled(disabled) {
    const btn = this._parentElement.querySelector('button[type="submit"]');

    if (btn) btn.disabled = disabled;
  }

  renderSpinner() {
    this._setSubmitDisabled(true);

    const markup = `
      <div class="spinner upload-status">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._showStatus(markup);
  }

  renderMessage(message = this._successMessage) {
    this._setSubmitDisabled(false);

    const markup = `
      <div class="message upload-status">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._showStatus(markup);
  }

  renderError(message) {
    this._setSubmitDisabled(false);

    const markup = `
      <div class="error upload-status">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._showStatus(markup);
  }

  resetForm() {
    this._parentElement.reset();
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
