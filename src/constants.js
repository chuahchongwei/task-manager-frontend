// Must match the ENUM in the backend's db/schema.sql
export const STATUS_LABELS = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const STATUSES = Object.keys(STATUS_LABELS);
