import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, Archive } from 'lucide-react';
import { DocumentStats } from '../types';

interface StatCardsProps {
    stats: DocumentStats;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
                        <h2 className="font-numeric">{stats.total}</h2>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Published</p>
                        <h2 className="font-numeric">{stats.published}</h2>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Unpublished</p>
                        <h2 className="font-numeric">{stats.unpublished}</h2>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                            <Archive className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Archived</p>
                        <h2 className="font-numeric">{stats.archived}</h2>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
