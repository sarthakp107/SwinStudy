import { FaFileAlt, FaClock, FaStar } from "react-icons/fa";

const guidelines = [
  {
    icon: <FaFileAlt className="h-4 w-4" />,
    title: "Supported formats",
    body: "PDF files up to 10 MB. DOCX & TXT support coming soon.",
  },
  {
    icon: <FaClock className="h-4 w-4" />,
    title: "Processing time",
    body: "Usually takes around 20 seconds to generate your deck.",
  },
  {
    icon: <FaStar className="h-4 w-4" />,
    title: "Best results",
    body: "Clear, well-formatted documents produce the best flashcards.",
  },
];

export const UploadGuidelines = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
      {guidelines.map(({ icon, title, body }) => (
        <div key={title} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
            {icon}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">{title}</p>
            <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
