import { TrendingUp, DollarSign, CheckCircle2, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Season } from '../types';

interface SeasonKPICardsProps {
  season: Season;
}

export function SeasonKPICards({ season }: SeasonKPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#777777]">Yield/ha</span>
            <TrendingUp className="w-4 h-4 text-[#3BA55D]" />
          </div>
          <div className="numeric text-2xl text-[#333333]">
            {season.yieldPerHa !== null ? season.yieldPerHa.toFixed(1) : '—'}
          </div>
          {season.yieldPerHa && (
            <div className="text-xs text-[#3BA55D] mt-1">tons/ha</div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#777777]">Cost/ha</span>
            <DollarSign className="w-4 h-4 text-[#4A90E2]" />
          </div>
          <div className="numeric text-2xl text-[#333333]">
            ${(season.actualCost / season.linkedPlots / 2.5).toFixed(0)}
          </div>
          <div className="text-xs text-[#777777] mt-1">USD</div>
        </CardContent>
      </Card>

      <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#777777]">On-time %</span>
            <CheckCircle2 className="w-4 h-4 text-[#3BA55D]" />
          </div>
          <div className="numeric text-2xl text-[#333333]">{season.onTimePercentage}</div>
          <div className="text-xs text-[#777777] mt-1">%</div>
        </CardContent>
      </Card>

      <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#777777]">Budget %</span>
            <DollarSign className="w-4 h-4 text-[#F4C542]" />
          </div>
          <div className={`numeric text-2xl ${
            (season.actualCost / season.budgetTotal) * 100 > 100
              ? 'text-[#E74C3C]'
              : 'text-[#333333]'
          }`}>
            {((season.actualCost / season.budgetTotal) * 100).toFixed(0)}
          </div>
          <div className="text-xs text-[#777777] mt-1">%</div>
        </CardContent>
      </Card>

      <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#777777]">Linked Plots</span>
            <MapPin className="w-4 h-4 text-[#3BA55D]" />
          </div>
          <div className="numeric text-2xl text-[#333333]">{season.linkedPlots}</div>
          <div className="text-xs text-[#777777] mt-1">plots</div>
        </CardContent>
      </Card>
    </div>
  );
}

