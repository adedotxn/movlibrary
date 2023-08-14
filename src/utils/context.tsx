import React, { useContext } from "react";
import { createContext, useState } from "react";

const tabsDefault = {
  tab: {
    popular: true,
    trending: false,
    playing: false,
    upcoming: false,
  },
  display: {
    popular() {
      return;
    },
    trending() {
      return;
    },
    playing() {
      return;
    },
    upcoming() {
      return;
    },
  },

  currentPage: 1,
  setCurrentPage: () => null,
};

type TabsDefault = {
  tab: {
    popular: boolean;
    trending: boolean;
    playing: boolean;
    upcoming: boolean;
  };
  display: {
    popular(): void;
    trending(): void;
    playing(): void;
    upcoming(): void;
  };
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const filterDefaults = {
  genreFilter: "",
  setGenreFilter: () => null,
  releaseDates: [""],
  dateFilter: "",
  setDateFilter: () => null,
  setReleaseDates: () => null,
};

type FilterDefaults = {
  genreFilter: string;
  setGenreFilter: React.Dispatch<React.SetStateAction<string>>;
  releaseDates: string[];
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
  setReleaseDates: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TabsContext = createContext<TabsDefault>(tabsDefault);

export const FilterContext = createContext<FilterDefaults>(filterDefaults);

export const UtilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState<{
    popular: boolean;
    trending: boolean;
    playing: boolean;
    upcoming: boolean;
  }>({
    popular: true,
    trending: false,
    playing: false,
    upcoming: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const display = {
    popular() {
      setTab({
        popular: true,
        trending: false,
        playing: false,
        upcoming: false,
      });
      setCurrentPage(1);
    },

    trending() {
      setTab({
        popular: false,
        trending: true,
        playing: false,
        upcoming: false,
      });
      setCurrentPage(1);
    },

    playing() {
      setTab({
        popular: false,
        trending: false,
        playing: true,
        upcoming: false,
      });
      setCurrentPage(1);
    },

    upcoming() {
      setTab({
        popular: false,
        trending: false,
        playing: false,
        upcoming: true,
      });
      setCurrentPage(1);

      console.log("upcoming");
    },
  };

  /** Filter States */
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("");

  return (
    <TabsContext.Provider value={{ tab, display, currentPage, setCurrentPage }}>
      <FilterContext.Provider
        value={{
          genreFilter,
          setGenreFilter,
          releaseDates,
          dateFilter,
          setDateFilter,
          setReleaseDates,
        }}
      >
        {children}
      </FilterContext.Provider>
    </TabsContext.Provider>
  );
};
