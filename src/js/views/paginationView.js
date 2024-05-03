import View from './View';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currPage, false, true);
    }

    //Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currPage, true, false);
    }

    //Other Page
    if (currPage < numPages) {
      return this._generateMarkupButton(currPage, true, true);
    }

    //Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(currPage, isPrev, isNext) {
    let buttonMarkUp = ``;
    if (isPrev) {
      buttonMarkUp += ` <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
                            <svg class="search__icon">
                                <use href="${icons}#icon-arrow-left"></use>
                            </svg>
                            <span>Page ${currPage - 1}</span>
                        </button>`;
    }

    if (isNext) {
      buttonMarkUp += ` <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
                            <span>Page ${currPage + 1}</span>
                            <svg class="search__icon">
                                <use href="${icons}#icon-arrow-right"></use>
                            </svg>
                        </button>`;
    }

    return buttonMarkUp;
  }
}

export default new PaginationView();
