/*
 * BookSum - view.js 1.0
 * Copyright 2024 SkyLabs.
 */

class View {
/*--------------------------------------------------------------------------*
 * Constructor
 *--------------------------------------------------------------------------*/
  constructor() {
    this.initClickables();
    this.initInputEnteredListener();
    this.hoverActiveMenu();
  }

/*--------------------------------------------------------------------------*
 * Public Methods
 *--------------------------------------------------------------------------*/
  initClickables() {
    $(".js-generate-summary").click(() => {
      let bookTitle = $(".js-book-title").val();
      mM.getSummary(bookTitle);
      $(".js-status").html("Generating summary ...");
    });
  }

  initInputEnteredListener() {
    $(".js-book-title").on('keydown', function(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        let bookTitle = $(this).val();
        mM.getSummary(bookTitle);
        $(".js-status").html("Generating summary ...");
      }
    });
  }

  hoverActiveMenu() {
    let pages = [ PAGE_HOME, PAGE_SHELVES, PAGE_CONTACT, PAGE_PROFILE ];
    pages.forEach((page) => {
      if (mM.isAt(page)) {
        console.log("isAt: " + page);
        $("#sum-header-menu-" + page).addClass("active");
      }
    });
  }

  renderBookList(response) {
//  TODO: rendering book list from db  
  }
}