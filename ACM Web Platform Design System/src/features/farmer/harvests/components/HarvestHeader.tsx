import { Plus, Wheat } from "lucide-react";
import { PageHeader } from "@/shared/ui";
import { Button } from "@/components/ui/button";

interface HarvestHeaderProps {
    onAddBatch: () => void;
}

export function HarvestHeader({
    onAddBatch,
}: HarvestHeaderProps) {
    return (
        <div className="space-y-4 mb-6">
            <PageHeader
                icon={<Wheat className="w-8 h-8" />}
                title="Harvest Management"
                subtitle="Track and manage harvest batches, quality control, and sales"
                actions={
                    <Button
                        onClick={onAddBatch}
                        variant="default"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Batch
                    </Button>
                }
            />
        </div>
    );
}
