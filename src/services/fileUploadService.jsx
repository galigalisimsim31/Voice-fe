import api from "./axios";

const FileUploadService = {
    upload: async (file) => {
        const formData = new FormData();
        formData.append('file', file); // field name MUST be 'file'
        const result = await api.post("/v1/user/upload-file", formData);
        return result;
    },
};

export default FileUploadService;