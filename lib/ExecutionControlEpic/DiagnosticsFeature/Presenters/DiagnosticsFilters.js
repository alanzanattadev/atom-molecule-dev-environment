"use babel";
// @flow

import React from "react";
import Tasks from "../../TaskExecutionFeature/Presenters/Tasks";
import styled from "styled-components";
import DiagnosticsTypeFilters from "./DiagnosticsTypeFilters";
import type { TravellingState } from "./DiagnosticsPanel";
import type { DiagnosticType } from "../Types/types.js.flow";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import { List } from "immutable";

const FilterCardBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  padding: 8px;
  overflow: auto;
  margin: 8px;
`;

const TasksFiltersBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`;

const TypeFiltersBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`;

const FiltersTitle = styled.h4`font-size: 16px;`;

const CloseButton = styled.div`
  align-self: flex-end;
  margin-top: 8px;
`;

const SearchField = styled.input`margin: 8px 0px;`;

const ClearButton = styled.div`
  margin: 8px;
  align-self: center;
`;

export default function DiagnosticsFilters({
  tasks = List(),
  onTypeFilterClick,
  onTaskFilterClick,
  onSearchChange,
  onClose,
  filters,
  onClear,
}: {
  tasks: List<Task>,
  onTypeFilterClick: (type: DiagnosticType) => void,
  onTaskFilterClick: (task: Task) => void,
  onSearchChange: (search: string) => void,
  onClose: () => void,
  filters: TravellingState,
  onClear: () => void,
}) {
  return (
    <FilterCardBox className="overlay-background-color">
      <ClearButton
        onClick={onClear}
        className="btn btn-success inline-block-tight"
      >
        Clear filters
      </ClearButton>
      <SearchField
        className="input-search"
        type="search"
        placeholder="search message"
        value={filters.search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <TypeFiltersBox>
        <FiltersTitle className="block">Types</FiltersTitle>
        <DiagnosticsTypeFilters
          onFilterClick={onTypeFilterClick}
          types={filters.diagnosticsTypes}
        />
      </TypeFiltersBox>
      <TasksFiltersBox>
        <FiltersTitle className="block">Tasks</FiltersTitle>
        <Tasks tasks={tasks} onTaskClick={onTaskFilterClick} />
      </TasksFiltersBox>
      <CloseButton
        className="btn btn-success inline-block-tight"
        onClick={onClose}
      >
        Save and hide
      </CloseButton>
    </FilterCardBox>
  );
}
