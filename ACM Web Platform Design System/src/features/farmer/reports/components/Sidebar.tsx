import { BarChart3 } from "lucide-react";
import type { ReportSection } from "../types";
import { SIDEBAR_ITEMS } from "../constants";

interface SidebarProps {
    activeSection: ReportSection;
    onSectionChange: (section: ReportSection) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
    return (
        <aside className="bg-white border-r border-[#E0E0E0] min-h-screen sticky top-0 hidden lg:block">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#81C784] flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg text-[#333333]">Reports</h2>
                        <p className="text-xs text-[#777777]">Analytics</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {SIDEBAR_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSectionChange(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all relative ${isActive
                                        ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                                        : "text-[#777777] hover:bg-[#F5F5F5]"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4CAF50] rounded-r-full" />
                                )}
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
