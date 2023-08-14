import TabPanels from "@/components/tabPabels";
import Tabs from "@/components/tabs";
import Filters from "@/components/filters";
import { useTabs } from "@/hooks";

export default function Home() {
  return (
    <>
      <section>
        <TabPanels />
        <Filters />
      </section>

      <section>
        <Tabs />
      </section>
    </>
  );
}
