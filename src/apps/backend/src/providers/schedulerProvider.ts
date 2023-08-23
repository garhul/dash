import { SchedulerRules } from "../services/store";
import { ruleData } from "../types/types";

export function del(id: string) {
  return SchedulerRules.del(id);
}

export function get(id: string): ruleData {
  return SchedulerRules.get(id);
}

export function getAll(): [string, ruleData][] {
  return SchedulerRules.getAll();
}