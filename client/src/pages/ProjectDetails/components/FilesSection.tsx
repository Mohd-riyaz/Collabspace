import { Download, FileText, Image, FileSpreadsheet, Upload } from "lucide-react";
import Card from "../../../components/ui/Card/Card";

const files = [
  {
    id: 1,
    name: "UI-Mockup.png",
    type: "image",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Requirements.pdf",
    type: "pdf",
    size: "1.1 MB",
  },
  {
    id: 3,
    name: "Sprint-Plan.xlsx",
    type: "excel",
    size: "780 KB",
  },
];

export default function FilesSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="text-blue-500" />;
      case "excel":
        return <FileSpreadsheet className="text-green-500" />;
      default:
        return <FileText className="text-red-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Project Files
        </h2>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Upload size={18} />
          Upload
        </button>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              {getIcon(file.type)}

              <div>
                <h3 className="font-semibold">
                  {file.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {file.size}
                </p>
              </div>
            </div>

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}