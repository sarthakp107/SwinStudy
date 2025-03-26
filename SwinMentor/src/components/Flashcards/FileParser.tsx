
import React, { useState, ChangeEvent } from 'react';
import { pdfjs } from 'react-pdf';
interface PDFExtractorProps {
    onTextExtracted: (text: string) => void;
    onError: (error: string) => void;
}

pdfjs.GlobalWorkerOptions.workerSrc = pdfjs.GlobalWorkerOptions.workerSrc = '/src/config/pdf.worker.mjs';

const PDFExtractor: React.FC<PDFExtractorProps> = ({ onTextExtracted, onError }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    // Function to extract text from PDF
    const extractTextFromPDF = async (file: File): Promise<string> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            // Extract text from each page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
            }
            return fullText;
        } catch (error) {
            console.error('Error extracting PDF text:', error);
            throw new Error('Could not read PDF file');
        }
    };
    // Handle file input change event
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFileError('');
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            setFileError('File too large. Please upload a file smaller than 10MB.');
            return;
        }
        setFile(file);
        try {
            let extractedText = '';
            if (file.type === 'application/pdf') {
                extractedText = await extractTextFromPDF(file);
            } else {
                const reader = new FileReader();
                extractedText = await new Promise<string>((resolve, reject) => {
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.onerror = (e) => reject(e);
                    reader.readAsText(file);
                });
            }
            onTextExtracted(extractedText.trim());
        } catch (error) {
            console.error('Error reading file:', error);
            onError('Error reading file content. Please try another file.');
        }
    };
    return (
        <div className="file-upload-container">
            <label className="file-upload-label">
                <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <i className="fas fa-cloud-upload-alt"></i>
                <span>{file ? file.name : 'Upload your document (PDF or TXT)'}</span>
            </label>
            {fileError && <div className="file-error">{fileError}</div>}
        </div>
    );
};
export default PDFExtractor;
