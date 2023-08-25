import { SchedulerRules } from "../services/store";
import { ruleData } from "@dash/sharedTypes";

export function del(id: string) {
  return SchedulerRules.del(id);
}

export function get(id: string): ruleData {
  return SchedulerRules.get(id);
}

export function getAll(): [string, ruleData][] {
  return SchedulerRules.getAll();
}