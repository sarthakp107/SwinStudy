//Component used in Upload Page outlining instructions on uploading of PDF
export const UploadGuidelines = () =>{
    return(
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Supported Formats</h4>
              <p className="text-gray-600 text-sm">PDF, DOCX, TXT files up to 10MB</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Processing Time</h4>
              <p className="text-gray-600 text-sm">Usually takes 20 seconds to process</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Best Practices</h4>
              <p className="text-gray-600 text-sm">Clear, well-formatted documents work best</p>
            </div>
        </div>
    )
}