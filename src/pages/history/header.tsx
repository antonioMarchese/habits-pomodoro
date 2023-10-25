import {
  Arrow,
  HistoryHeader,
  LeftHeader,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  FilterContainer,
  ButtonContainer,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  ViewPortPosition,
} from "./styles";
import { BaseInput } from "../../components/Input";
import { BaseButton } from "../../components/button";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import {
  MagnifyingGlass,
  ArrowCounterClockwise,
  DotsThreeCircle,
  FileXls,
  Trash,
  ChartBar,
  Table,
} from "phosphor-react";
import { useContext, useState } from "react";
import { CyclesContext } from "../../context/cyclesContext";

interface HistoryHeaderProps {
  filterTitle: string;
  filterDate: string;
  activeSection: "table" | "charts";
  handleCleanFilter: () => void;
  setFilterTitle: (title: string) => void;
  toggleActiveSection: () => void;
  setFilterDate: (date: string) => void;
  exportXLSX: () => void;
}

export default function Header({
  activeSection,
  filterDate,
  filterTitle,
  handleCleanFilter,
  setFilterDate,
  setFilterTitle,
  toggleActiveSection,
  exportXLSX,
}: HistoryHeaderProps) {
  const { cycles, activeCycleId, clearCyclesHistory } =
    useContext(CyclesContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleToggleFilterVisibility() {
    if (isFilterOpen) {
      handleCleanFilter();
    }
    setIsFilterOpen((prevState) => !prevState);
  }

  const isClearButtonDisabled =
    cycles.length === 1 && cycles[0].id === activeCycleId;
  return (
    <HistoryHeader>
      <LeftHeader>
        <h1>Meu Histórico</h1>
        {activeSection === "table" && (
          <ChartBar size={24} onClick={toggleActiveSection} />
        )}
        {activeSection === "charts" && (
          <Table size={24} onClick={toggleActiveSection} />
        )}
        {activeSection === "table" && (
          <CollapsibleRoot
            open={isFilterOpen}
            onOpenChange={handleToggleFilterVisibility}
          >
            <CollapsibleTrigger>
              <MagnifyingGlass size={24} />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <FilterContainer>
                <BaseInput
                  value={filterTitle}
                  onChange={(e) => setFilterTitle(e.target.value)}
                  placeholder="Título"
                />
                <BaseInput
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                {(filterDate || filterTitle) && (
                  <ArrowCounterClockwise
                    size={48}
                    onClick={handleCleanFilter}
                    className="reset-filter"
                  />
                )}
              </FilterContainer>
            </CollapsibleContent>
          </CollapsibleRoot>
        )}
      </LeftHeader>
      <ButtonContainer>
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                <DotsThreeCircle size={24} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <BaseButton
                  disabled={cycles.length === 0}
                  onClick={exportXLSX}
                  className="first-child"
                >
                  <FileXls size={24} />
                  Gerar relatório
                </BaseButton>
                <BaseButton
                  disabled={isClearButtonDisabled}
                  onClick={clearCyclesHistory}
                  className="last-child"
                >
                  <Trash size={24} />
                  Limpar histórico
                </BaseButton>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenuIndicator>
              <Arrow />
            </NavigationMenuIndicator>
          </NavigationMenuList>

          <ViewPortPosition>
            <NavigationMenuViewport />
          </ViewPortPosition>
        </NavigationMenuRoot>
      </ButtonContainer>
    </HistoryHeader>
  );
}
