import { ReactNode, createContext, useContext, useState } from "react";
import { IChoosePlan } from "@/utils/interfaces";

export const BillPlanContext = createContext<{
  selectedPlan: IChoosePlan;
  setSelectedPlan: (value: IChoosePlan | ((prev: IChoosePlan) => IChoosePlan)) => void;
}>({
  selectedPlan: {
    id: "",
    type: "",
    icon: "",
    cost: "",
    item: []
  },
  setSelectedPlan: () => { },
});

export const BillPlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<IChoosePlan>({
    id: "",
    type: "",
    icon: "",
    cost: "",
    item: []
  });

  return (
    <BillPlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </BillPlanContext.Provider>
  );
};

export const useBillPlan = () => useContext(BillPlanContext);
