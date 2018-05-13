export const Editor_Upload_Image_Request = 'Editor_Upload_Image_Request'
export const Editor_Upload_Image_Success = 'Editor_Upload_Image_Success'
export const Editor_Upload_Image_Failure = 'Editor_Upload_Image_Failure'

const EditorUploadImageOption = {
    Requset: (json) => ({
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

const EditorNewEditorRequest = {
    type: Editor_New_Article_Request
}

const EditorNewEditorSuccess = {
    type: Editor_New_Article_Success
}