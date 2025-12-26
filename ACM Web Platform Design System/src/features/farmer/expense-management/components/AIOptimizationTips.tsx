import {
    Sparkles,
    TrendingDown,
    AlertTriangle,
    Lightbulb,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AI_TIPS: any[] = []; // TODO: Replace with API data when available

export function AIOptimizationTips() {
    return (
        <Card className="border-[#4A90E2] rounded-2xl shadow-sm bg-gradient-to-br from-[#4A90E2]/5 to-transparent">
            <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#4A90E2]" />
                    AI Cost Optimization
                </CardTitle>
                <CardDescription className="text-xs text-[#777777]">
                    Smart insights to reduce costs
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {AI_TIPS.map((tip) => (
                    <div
                        key={tip.id}
                        className="p-3 rounded-xl bg-white border border-[#E0E0E0]"
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tip.type === "saving"
                                    ? "bg-[#3BA55D]/10"
                                    : tip.type === "warning"
                                        ? "bg-[#F4C542]/10"
                                        : "bg-[#4A90E2]/10"
                                    }`}
                            >
                                {tip.type === "saving" ? (
                                    <TrendingDown className="w-4 h-4 text-[#3BA55D]" />
                                ) : tip.type === "warning" ? (
                                    <AlertTriangle className="w-4 h-4 text-[#F4C542]" />
                                ) : (
                                    <Lightbulb className="w-4 h-4 text-[#4A90E2]" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="text-xs text-[#333333]">{tip.title}</h4>
                                    {tip.potentialSaving && (
                                        <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20 text-xs numeric flex-shrink-0">
                                            -${tip.potentialSaving}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-[#777777] leading-relaxed">
                                    {tip.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    variant="outline"
                    className="w-full rounded-xl border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2]/10"
                >
                    View All Insights
                </Button>
            </CardContent>
        </Card>
    );
}
