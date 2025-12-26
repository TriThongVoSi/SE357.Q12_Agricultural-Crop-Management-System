import { Plus, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InventoryItem } from "../types";

interface LowStockInventoryProps {
  inventory: InventoryItem[];
}

/**
 * Low Stock Inventory Component
 *
 * Displays inventory items that are below minimum stock levels with:
 * - Item count badge
 * - Current vs minimum stock comparison
 * - Progress bar visualization
 * - Quick action button to order supplies
 */
export function LowStockInventory({ inventory }: LowStockInventoryProps) {
  return (
    <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Low Stock Inventory</CardTitle>
            <CardDescription>Items below minimum level</CardDescription>
          </div>
          <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20">
            {inventory.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {inventory.map((item) => {
            const percentage = (item.current / item.minimum) * 100;
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#1F2937]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    <span className="numeric text-[#E74C3C]">
                      {item.current}
                    </span>
                    /{item.minimum} {item.unit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
          <Button
            variant="outline"
            className="w-full mt-2 rounded-lg border-[#3BA55D] text-[#3BA55D] hover:bg-[#3BA55D]/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Order Supplies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

