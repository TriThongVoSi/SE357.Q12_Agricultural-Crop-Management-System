import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { Bot, AlertCircle, Sparkles } from 'lucide-react';

/**
 * AI Assistant Page (Placeholder)
 * 
 * This is a placeholder page for the AI Assistant feature.
 * Note: The AI float button is already integrated globally.
 */
export function AiAssistantPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-[#2F9E44]" />
                <div>
                    <h1 className="text-3xl font-bold text-[#333333]">AI Assistant</h1>
                    <p className="text-[#777777]">Trợ lý ảo</p>
                </div>
            </div>

            {/* Under Construction Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        Under Construction
                    </CardTitle>
                    <CardDescription>
                        Get AI-powered farming assistance and insights
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-[#555555]">
                        The AI Assistant feature is currently under development. This feature will provide:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[#555555] ml-4">
                        <li>Intelligent farming recommendations based on your data</li>
                        <li>Crop disease and pest identification from images</li>
                        <li>Weather-based planting and harvesting suggestions</li>
                        <li>Yield prediction and optimization tips</li>
                        <li>Natural language queries about your farm data</li>
                        <li>Automated task scheduling and reminders</li>
                        <li>Market price insights and selling recommendations</li>
                    </ul>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-green-900 mb-1">
                                    AI Assistant is Already Available!
                                </p>
                                <p className="text-sm text-green-800">
                                    You can access the AI Assistant right now by clicking the floating AI button
                                    in the bottom-right corner of the screen. This dedicated page will provide
                                    additional AI features and a more comprehensive interface in the future.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                            <strong>Note:</strong> The AI entity already exists in the system at{' '}
                            <code className="bg-blue-100 px-1 py-0.5 rounded">src/entities/ai</code>.
                            The global AI float button is integrated in the farmer portal.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
