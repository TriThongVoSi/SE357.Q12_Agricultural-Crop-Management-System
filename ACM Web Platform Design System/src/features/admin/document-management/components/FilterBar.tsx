import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { DocumentTopic, DocumentStatus, DocumentVisibility } from '../types';

interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    topicFilter: DocumentTopic | 'all';
    setTopicFilter: (filter: DocumentTopic | 'all') => void;
    statusFilter: DocumentStatus | 'all';
    setStatusFilter: (filter: DocumentStatus | 'all') => void;
    visibilityFilter: DocumentVisibility | 'all';
    setVisibilityFilter: (filter: DocumentVisibility | 'all') => void;
    filterOpen: boolean;
    setFilterOpen: (open: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    setSearchQuery,
    topicFilter,
    setTopicFilter,
    statusFilter,
    setStatusFilter,
    visibilityFilter,
    setVisibilityFilter,
    filterOpen,
    setFilterOpen,
}) => {
    const activeFilterCount =
        (topicFilter !== 'all' ? 1 : 0) +
        (statusFilter !== 'all' ? 1 : 0) +
        (visibilityFilter !== 'all' ? 1 : 0);

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, tag, or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                        <Button
                            variant="outline"
                            onClick={() => setFilterOpen(true)}
                            className="w-full md:w-auto"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filter Documents</SheetTitle>
                                <SheetDescription>
                                    Apply filters to refine your document list
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label>Topic / Category</Label>
                                    <Select value={topicFilter} onValueChange={(v: string) => setTopicFilter(v as DocumentTopic | 'all')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Topics</SelectItem>
                                            <SelectItem value="farming_guide">Farming Guide</SelectItem>
                                            <SelectItem value="crop_diseases">Crop Diseases</SelectItem>
                                            <SelectItem value="pest_control">Pest Control</SelectItem>
                                            <SelectItem value="soil_management">Soil Management</SelectItem>
                                            <SelectItem value="irrigation">Irrigation</SelectItem>
                                            <SelectItem value="harvest_tips">Harvest Tips</SelectItem>
                                            <SelectItem value="market_prices">Market Prices</SelectItem>
                                            <SelectItem value="compliance">Compliance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select value={statusFilter} onValueChange={(v: string) => setStatusFilter(v as DocumentStatus | 'all')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="unpublished">Unpublished</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Visibility</Label>
                                    <Select value={visibilityFilter} onValueChange={(v: string) => setVisibilityFilter(v as DocumentVisibility | 'all')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Visibility</SelectItem>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="farmer">Farmer</SelectItem>
                                            <SelectItem value="buyer">Buyer</SelectItem>
                                            <SelectItem value="internal">Internal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => {
                                            setTopicFilter('all');
                                            setStatusFilter('all');
                                            setVisibilityFilter('all');
                                        }}
                                    >
                                        Clear All
                                    </Button>
                                    <Button
                                        className="flex-1 bg-[#2563EB] hover:bg-[#1E40AF]"
                                        onClick={() => setFilterOpen(false)}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </CardContent>
        </Card>
    );
};
