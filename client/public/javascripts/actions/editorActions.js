export const Editor_Upload_Image_Request = 'Editor_Upload_Image_Request'
export const Editor_Upload_Image_Success = 'Editor_Upload_Image_Success'
export const Editor_Upload_Image_Failure = 'Editor_Upload_Image_Failure'

const EditorUploadImageOption = {
    Request: (json) => ({
        type: Editor_Upload_Image_Request,
        data: json
    }),

    Success: () => ({
        type: Editor_Upload_Image_Success
    }),

    Failure: () => ({
        type: Editor_Upload_Image_Failure
    })
}

export const Editor_New_Article_Request = 'Editor_New_Article_Request'
export const Editor_New_Article_Success = 'Editor_New_Article_Success'
export const Editor_New_Article_Failure = 'Editor_New_Article_Failure'

const EditorNewEditorOption = {
    Request: () => ({
        type: Editor_New_Article_Request
    }),

    Success: (json) => ({
        type: Editor_New_Article_Success,
        data: json
    }),

    Failure: () => ({
        type: Editor_New_Article_Failure
    })
}

export const Editor_Open_Article_Request = 'Editor_Open_Article_Request'
export const Editor_Open_Article_Success = 'Editor_Open_Article_Success'
export const Editor_Open_Article_Failure = 'Editor_Open_Article_Failure'

const EditorOpenArticleOption = {
    Request: () => ({
        type: Editor_Open_Article_Request
    }),

    Success: (json) => ({
        type: Editor_Open_Article_Success,
        data: json
    }),

    Failure: (err) => ({
        type: Editor_Open_Article_Failure,
        data: err
    })
}

export const Editor_Open_Titles_Request = 'Editor_Open_Titles_Request'
export const Editor_Open_Titles_Success = 'Editor_Open_Titles_Success'
export const Editor_Open_Titles_Failure = 'Editor_Open_Titles_Failure'

const EditorOpenTitlesOption = {
    Request: () => ({
        type: Editor_Open_Titles_Request
    }),

    Success: (json) => ({
        type: Editor_Open_Titles_Success,
        data: json
    }),

    Failure: (err) => ({
        type: Editor_Open_Titles_Failure,
        data: err
    })
}

export const Editor_Change_Title = 'Editor_Change_Title'

const EditorChangeTitleAction = (title) => ({
    type: Editor_Change_Title,
    title
})

export const Editor_On_Save_Request = 'Editor_On_Save_Request'
export const Editor_On_Save_Success = 'Editor_On_Save_Success'
export const Editor_On_Save_Failure = 'Editor_On_Save_Failure'

const EditorOnSaveOption = {
    Request: () => ({
        type: Editor_On_Save_Request
    }),

    Success: json => ({
        type: Editor_On_Save_Success,
        data: json
    }),


    Failure: err => ({
        type: Editor_On_Save_Failure,
        data: err
    })
}

export { EditorUploadImageOption, EditorNewEditorOption, EditorOpenArticleOption, EditorOpenTitlesOption, EditorChangeTitleAction, EditorOnSaveOption }