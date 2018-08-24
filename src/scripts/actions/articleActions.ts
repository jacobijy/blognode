export const Articles_Main_Page_Request = 'Articles_Main_Page_Request';
export const Articles_Main_Page_SUCCESS = 'Articles_Main_Page_SUCCESS';
export const Articles_Main_Page_LOADMORE = 'Articles_Main_Page_LOADMORE';
export const Articles_Main_Page_FAILURE = 'Articles_Main_Page_FALIURE';

const ArticleMainPageOption = {
  Request: (json: object) => ({
    type: Articles_Main_Page_Request,
    data: json
  }),

  Failure: (err: Error) => ({
    type: Articles_Main_Page_FAILURE,
    data: err
  }),

  Success: (json: object) => ({
    type: Articles_Main_Page_SUCCESS,
    data: json
  })
};

export { ArticleMainPageOption };
