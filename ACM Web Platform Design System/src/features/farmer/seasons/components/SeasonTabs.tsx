import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Season, Activity } from '../types';

interface SeasonTabsProps {
  season: Season;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activities: Activity[];
}

export function SeasonTabs({ season, activeTab, setActiveTab, activities }: SeasonTabsProps) {
  const effectiveEndDate = season.endDate || season.plannedHarvestDate || season.startDate;
  const endDateLabel = effectiveEndDate
    ? new Date(effectiveEndDate).toLocaleDateString()
    : '-';

  return (
    <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="border-b border-[#E0E0E0]">
          <TabsList className="bg-[#F8F8F4]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plots">Linked Plots</TabsTrigger>
            <TabsTrigger value="tasks">Tasks Summary</TabsTrigger>
            <TabsTrigger value="budget">Budget & Expenses</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="p-6">
          <TabsContent value="overview" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-[#777777]">Crop</Label>
                  <div className="mt-1 text-[#333333]">{season.crop}</div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">Variety</Label>
                  <div className="mt-1 text-[#333333]">{season.variety}</div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">Start Date</Label>
                  <div className="mt-1 text-[#333333]">
                    {new Date(season.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">End Date</Label>
                  <div className="mt-1 text-[#333333]">
                    {endDateLabel}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">Total Tasks</Label>
                  <div className="mt-1 text-[#333333] numeric">
                    {season.tasksCompleted} / {season.tasksTotal}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">Incidents</Label>
                  <div className="mt-1 text-[#333333] numeric">{season.incidentCount}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plots" className="mt-0">
            <div className="text-sm text-[#777777]">
              {season.linkedPlots} plots are linked to this season
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#777777]">Task Completion</span>
                <span className="numeric text-sm text-[#333333]">
                  {season.tasksCompleted} / {season.tasksTotal}
                </span>
              </div>
              <Progress
                value={(season.tasksCompleted / season.tasksTotal) * 100}
              />
            </div>
          </TabsContent>

          <TabsContent value="budget" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-[#777777]">Budget Total</Label>
                  <div className="mt-1 text-[#333333] numeric">
                    ${season.budgetTotal.toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-[#777777]">Actual Cost</Label>
                  <div className="mt-1 text-[#333333] numeric">
                    ${season.actualCost.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-[#777777] mb-2 block">Budget Usage</Label>
                <Progress
                  value={(season.actualCost / season.budgetTotal) * 100}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="mt-0">
            <div className="text-sm text-[#777777]">
              {season.incidentCount} incidents reported
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <div className="text-sm text-[#777777]">
              {season.documentCount} documents attached
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
