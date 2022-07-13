import React, { useRef } from "react";

const FileUploader = ({ onFileSelect }) => {
    // const fileInput = useRef(null);

    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
    };

    return (
        <div className="file-uploader">
            <input
                style={{ marginLeft: "1rem" }}
                type="file"
                onChange={handleFileInput}
            />
        </div>
    );
};

export default FileUploader;
