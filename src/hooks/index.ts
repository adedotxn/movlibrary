import { FilterContext, TabsContext } from "@/utils/context";
import { useContext } from "react";

export const useTabs = () => {
    return useContext(TabsContext);
};


export const useFilters = () => {
    return useContext(FilterContext);
};
