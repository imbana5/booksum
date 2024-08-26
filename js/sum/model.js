/*
 * BookSum - model.js 1.0
 * Copyright 2024 SkyLabs.
 */

class Model {
/*--------------------------------------------------------------------------*
 * Constructor
 *--------------------------------------------------------------------------*/
  constructor() {}

/*--------------------------------------------------------------------------*
 * Public Methods
 *--------------------------------------------------------------------------*/
  getSummaryWithToken(bookTitle, token) {
    console.log("getSummaryWithToken of: " + JSON.stringify(token));
    let data = {
      "book_title": bookTitle,
      "token": token
    };

    return $.ajax({
      url: '../../api/ask-watsonx',
      data: data,
      type: 'GET'
    }).done(response => {
      console.log(response);
      mV.renderSummary(response);
      return response;
    }).fail((jqXHR, status, error) => {
      console.error('Error getting summary:', status, error);
    });
  }

  getSummary(bookTitle) {
    let t = this;
    console.log("getSummary: " + bookTitle);
    t.getValidToken(bookTitle).then(response => {
      t.getSummaryWithToken(bookTitle, response['access_token']);
    });
  }

  getValidToken(bookTitle) {
    let t = this;
    console.log("getValidToken()");
    return $.ajax({
      url: '../../api-db/tokens/available',
      type: 'GET'
    }).done(response => {
      console.log(response);
      let token = ["access_token"];
      return token;
    }).fail((jqXHR, status, error) => {
      console.error('Error getting token:', status, error);
      t.getNewToken().then(response => {
        t.storeValidToken(response);
        t.getSummaryWithToken(bookTitle, response["access_token"]);
      });
    });
  }

  storeValidToken(token) {
    console.log("storeValidToken()");
    return $.ajax({
      url: '../../api-db/tokens',
      data: { "data": token },
      type: 'POST'
    }).done(response => {
      console.log(response);
      return response;
    }).fail((jqXHR, status, error) => {
      console.error('Error storing token:', status, error);
    });
  }

  getNewToken() {
    console.log("getNewToken()");
    return $.ajax({
      url: '../../api/get-token',
      type: 'GET'
    }).done(response => {
      console.log(response);
      return response.access_token;
    }).fail((jqXHR, status, error) => {
      console.error('Error fetching tasks:', status, error);
    });
  }

  fetchBookList() {
    // TODO: Fetching book list from db
  }

  isAt(page) {
    if (page == PAGE_HOME 
      && !(urlHas(PAGE_SHELVES) | urlHas(PAGE_CONTACT) | urlHas(PAGE_PROFILE))) {
      return true;
    }
    return urlHas(page);
  }
}