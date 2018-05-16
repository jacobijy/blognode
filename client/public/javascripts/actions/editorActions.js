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

export const Editor_On_Open_Request = 'Editor_On_Open_Request'
export const Editor_On_Open_Success = 'Editor_On_Open_Success'
export const Editor_On_Open_Failure = 'Editor_On_Open_Failure'

const EditorOnOpenOption = {
    Request: () => ({
        type: Editor_On_Open_Request
    }),

    Success: (json) => ({
        type: Editor_On_Open_Success,
        data: json
    }),

    Failure: () => ({
        type: Editor_On_Open_Failure
    })
}

export { EditorUploadImageOption, EditorNewEditorOption, EditorOnOpenOption }