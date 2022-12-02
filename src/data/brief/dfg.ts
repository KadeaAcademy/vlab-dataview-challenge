import { CustomEdge } from "../../types/view-types";

export const dfg: CustomEdge[] = [
  {
    source: "MVA_Error_Transaction",
    target: "MVA_Error_Transaction",
    label: 13774,
  },
  { source: "MVA_Error_Transaction", target: "TICKET_In_SLA", label: 1277 },
  { source: "MVA_Error_Transaction", target: "TICKET_Out_of_SLA", label: 342 },
  { source: "MVA_Error_Transaction", target: "VISIT_VODASHOP", label: 2360 },
  { source: "TICKET_In_SLA", target: "MVA_Error_Transaction", label: 1176 },
  { source: "TICKET_In_SLA", target: "TICKET_In_SLA", label: 3331 },
  { source: "TICKET_In_SLA", target: "TICKET_Out_of_SLA", label: 662 },
  { source: "TICKET_In_SLA", target: "VISIT_VODASHOP", label: 2730 },
  { source: "TICKET_Out_of_SLA", target: "MVA_Error_Transaction", label: 381 },
  { source: "TICKET_Out_of_SLA", target: "TICKET_In_SLA", label: 648 },
  { source: "TICKET_Out_of_SLA", target: "TICKET_Out_of_SLA", label: 258 },
  { source: "TICKET_Out_of_SLA", target: "VISIT_VODASHOP", label: 685 },
  { source: "VISIT_VODASHOP", target: "MVA_Error_Transaction", label: 2413 },
  { source: "VISIT_VODASHOP", target: "TICKET_In_SLA", label: 2656 },
  { source: "VISIT_VODASHOP", target: "TICKET_Out_of_SLA", label: 702 },
  { source: "VISIT_VODASHOP", target: "VISIT_VODASHOP", label: 20559 },
];
