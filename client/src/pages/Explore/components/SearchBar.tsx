import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    onChange,
}: SearchBarProps) {
    return (
        <div className="relative w-full">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search workspaces, projects or people..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}