import { Groups } from '../services/store';
import { groupData } from '../types/types';

export function del(id: string): boolean {
  return Groups.del(id);
}

export function get(id: string): groupData | null {
  return Groups.get(id);
}

export function getAll(): [string, groupData][] {
  return Groups.getAll();
}