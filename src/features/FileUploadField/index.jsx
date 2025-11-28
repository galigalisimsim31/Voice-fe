import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const FileUploadField = ({ label, name, register, error, accept = ".jpg,.png,.pdf", isRequired = false, fileUrl = "" }) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState('');

  const inputId = `file-upload-${name}`; // unique ID per input

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setSelectedFileType(file.type);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl({
        type: "LOCAL",
        url: localUrl
      })
    }
    else setSelectedFileName('');
  };

  useEffect(() => {
    if (fileUrl && typeof fileUrl === "string") {
      setPreviewUrl({
        type: "LIVE",
        url: fileUrl
      });
      setSelectedFileType(fileUrl.endsWith(".pdf") ? "application/pdf" : "image");
    }
  }, [fileUrl])

  return (
    <>
      <Typography fontWeight="bold" mb={0.5} className='form-label' variant="subtitle2" gutterBottom>{label} {isRequired && <span className='error'>*</span>}</Typography>

      <Box
        component="label"
        htmlFor={inputId}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: error ? 'error.main' : '#ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '0.8rem',
        }}
      >
        <Box sx={{ borderRight: '1px solid', borderColor: error ? 'error.main' : '#ccc', color: '#666', padding: '9px 10px', borderRadius: "4px", backgroundColor: '#F3F5F9' }}>
          Choose
        </Box>
        <Box sx={{
          color: '#555',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '9px 10px',
          flexGrow: 1,
          fontSize: '0.8rem',
        }}>
          {selectedFileName || 'JPG, JPEG, PDF'}
        </Box>
      </Box>

      <input
        id={inputId}
        type="file"
        accept={accept}
        hidden
        {...register(name)} // ← this registers the field
        onChange={(e) => {
          register(name).onChange(e); // maintain RHF sync
          handleFileChange(e);        // update filename state
        }}
      />

      {error && (
        <Typography variant="caption" color="error" mt={1} display="block">
          {error.message}
        </Typography>
      )}

      {previewUrl?.url && (
        <>
          {selectedFileType === "application/pdf" ? (
            <Box mt={1}>
              <a
                href={
                  previewUrl.type === "LIVE"
                    ? `${import.meta.env.VITE_API_BASE_URL}/show-image/${previewUrl.url}`
                    : previewUrl.url
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: 500,
                }}
              >
                📄 Download PDF
              </a>
            </Box>
          ) : (
            <img
              src={
                previewUrl.type === "LIVE"
                  ? `${import.meta.env.VITE_API_BASE_URL}/show-image/${previewUrl.url}`
                  : previewUrl.url
              }
              alt="Preview"
              style={{
                marginTop: 10,
                maxWidth: "100%",
                maxHeight: 150,
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default FileUploadField;
