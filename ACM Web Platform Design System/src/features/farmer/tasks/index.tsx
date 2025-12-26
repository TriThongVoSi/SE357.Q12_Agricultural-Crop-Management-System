import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTaskWorkspace } from './hooks/useTaskWorkspace';
import { TaskHeader } from './components/TaskHeader';
import { SearchFilterBar } from './components/SearchFilterBar';
import { BoardView } from './components/BoardView';
import { ListView } from './components/ListView';
import { CalendarView } from './components/CalendarView';
import { FilterDrawer } from './components/FilterDrawer';
import { CreateTaskDialog } from './components/CreateTaskDialog';
import { ReassignDialog } from './components/ReassignDialog';
import { BulkActionToolbar } from './components/BulkActionToolbar';

export function TaskWorkspace() {
  const {
    viewMode,
    setViewMode,
    calendarMode,
    setCalendarMode,
    currentDate,
    setCurrentDate,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    activeFilterCount,
    selectedTasks,
    setSelectedTasks,
    filterDrawerOpen,
    setFilterDrawerOpen,
    createTaskOpen,
    setCreateTaskOpen,
    reassignOpen,
    setReassignOpen,
    filteredTasks,
    uniqueAssignees,
    uniquePlots,
    handleTaskMove,
    handleBulkComplete,
    handleDeleteTask,
    handleSelectAll,
    handleSelectTask,
    handleReassign,
    handleCreateTask,
  } = useTaskWorkspace();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#F8F8F4] pb-20">
        <TaskHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateTask={() => setCreateTaskOpen(true)}
        />

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          activeFilterCount={activeFilterCount}
          onOpenFilters={() => setFilterDrawerOpen(true)}
        />

        <div className="max-w-[1800px] mx-auto p-6">
          {viewMode === 'board' && (
            <BoardView tasks={filteredTasks} onTaskMove={handleTaskMove} onDelete={handleDeleteTask} />
          )}
          {viewMode === 'list' && (
            <ListView
              tasks={filteredTasks}
              selectedTasks={selectedTasks}
              onSelectAll={handleSelectAll}
              onSelectTask={handleSelectTask}
              onDelete={handleDeleteTask}
            />
          )}
          {viewMode === 'calendar' && (
            <CalendarView
              tasks={filteredTasks}
              mode={calendarMode}
              currentDate={currentDate}
              onModeChange={setCalendarMode}
              onDateChange={setCurrentDate}
            />
          )}
        </div>

        {selectedTasks.length > 0 && (
          <BulkActionToolbar
            selectedCount={selectedTasks.length}
            onComplete={handleBulkComplete}
            onReassign={() => setReassignOpen(true)}
            onChangeDueDate={() => {}}
            onClose={() => setSelectedTasks([])}
          />
        )}

        <FilterDrawer
          open={filterDrawerOpen}
          onOpenChange={setFilterDrawerOpen}
          filters={filters}
          onFiltersChange={setFilters}
          uniqueAssignees={uniqueAssignees}
          uniquePlots={uniquePlots}
        />

        <CreateTaskDialog
          open={createTaskOpen}
          onOpenChange={setCreateTaskOpen}
          onCreateTask={handleCreateTask}
          uniquePlots={uniquePlots}
          uniqueAssignees={uniqueAssignees}
        />

        <ReassignDialog
          open={reassignOpen}
          onOpenChange={setReassignOpen}
          selectedCount={selectedTasks.length}
          onReassign={handleReassign}
          uniqueAssignees={uniqueAssignees}
        />
      </div>
    </DndProvider>
  );
}

