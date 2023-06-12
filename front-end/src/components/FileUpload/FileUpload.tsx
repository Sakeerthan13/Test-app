import React, { useState, useEffect } from 'react';
import axios from "axios";
import './FileUpload.css';

interface CustomFile extends File {
    finalFilename?: string;
}

const chunkSize = 1 * 1024;

const FileUpload: React.FC = () => {
    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState<CustomFile[]>([]);
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number | null>(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState<number | null>(null);

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }

    function readAndUploadCurrentChunk(): void {
        const reader = new FileReader();
        const file = files[currentFileIndex ?? 0];
        if (!file) {
            return;
        }
        const from = (currentChunkIndex ?? 0) * chunkSize;
        const to = from + chunkSize;
        const blobFile = file.slice(from, to);
        const blob = new Blob([blobFile], { type: 'text/plain' });
        reader.onload = (e: ProgressEvent<FileReader>) => uploadChunk(e);
        reader.readAsDataURL(blob);
    }

    function uploadChunk(readerEvent: Event) {
        const file = files[currentFileIndex ?? 0];
        const data = (readerEvent.target as FileReader).result as string;
        const params = new URLSearchParams();
        params.set('name', file.name + '.txt');
        params.set('size', file.size.toString());
        params.set('currentChunkIndex', (currentChunkIndex ?? 0).toString());
        params.set('totalChunks', Math.ceil(file.size / chunkSize).toString());
        const headers: { [key: string]: string } = { 'Content-Type': 'application/octet-stream' };
        const url = 'http://localhost:4000/upload?' + params.toString();
        axios.post(url, data, { headers })
            .then(response => {
                const file = files[currentFileIndex ?? 0];
                const filesize = files[currentFileIndex ?? 0].size;
                const chunks = Math.ceil(filesize / chunkSize) - 1;
                const isLastChunk = currentChunkIndex === chunks;
                if (isLastChunk) {
                    file.finalFilename = response.data.finalFilename;
                    setLastUploadedFileIndex(currentFileIndex ?? 0);
                    setCurrentChunkIndex(null);
                } else {
                    setCurrentChunkIndex((currentChunkIndex ?? 0) + 1);
                }
            });
    }

    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return;
        }
        const isLastFile = lastUploadedFileIndex === files.length - 1;
        const nextFileIndex = isLastFile ? null : (currentFileIndex ?? 0) + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [currentFileIndex]);

    useEffect(() => {
        if (files.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null ? 0 : (lastUploadedFileIndex ?? 0) + 1
                );
            }
        }
    }, [files.length]);

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) {
            readAndUploadCurrentChunk();
        }
    }, [currentChunkIndex]);




    return (
        <div>
            <div
                onDragOver={(e) => {
                    setDropzoneActive(true);
                    e.preventDefault();
                }}
                onDragLeave={(e) => {
                    setDropzoneActive(false);
                    e.preventDefault();
                }}
                onDrop={(e) => handleDrop(e)}
                className={"dropzone" + (dropzoneActive ? " active" : "")}
            >
                Drop your files here
            </div>
            <div className="files">
                {files.map((file, fileIndex) => {
                    if (
                        file.type === 'application/pdf' ||
                        file.type === 'application/x-zip-compressed'
                    ) {
                        let progress = 0;
                        if (file.finalFilename) {
                            progress = 100;
                        } else {
                            const uploading = fileIndex === currentFileIndex;
                            const chunks = Math.ceil(file.size / chunkSize);
                            if (uploading) {
                                progress = Math.round(((currentChunkIndex ?? 0) / chunks) * 100);
                            } else {
                                progress = 0;
                            }
                        }
                        return (
                            <a
                                className="file"
                                target="_blank"
                                href={"http://localhost:4000/uploads/" + file.finalFilename} rel="noreferrer"
                            >
                                <div className="name">{file.name}</div>
                                <div
                                    className={"progress " + (progress === 100 ? "done" : "")}
                                    style={{ width: progress + "%" }}
                                >
                                    {progress}%
                                </div>
                            </a>
                        );
                    } else {
                        return (
                            <h3 style={{ color: 'red' }}>
                                You can upload pdf file or zip file only.{' '}
                            </h3>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default FileUpload;
