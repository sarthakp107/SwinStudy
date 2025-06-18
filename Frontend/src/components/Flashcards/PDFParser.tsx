import { LOCATION_OF_PDF_WORKER } from '@/config/Constants';
import { pdfjs } from 'react-pdf';
//Function that takes any PDF and extracts Text from it. Returns a string of extracted text.

pdfjs.GlobalWorkerOptions.workerSrc = LOCATION_OF_PDF_WORKER //Initialising Worker

export  const PDFParser = async(file:File): Promise<string> =>
        {
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
                return fullText //Return one string of extracted text
            } catch (error) {
                console.error('Error extracting PDF text:', error);
                throw new Error('Could not read PDF file');
            }
        }


