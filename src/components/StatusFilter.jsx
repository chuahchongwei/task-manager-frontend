// Tabs to filter the list: All / To do / In progress / Done
import { STATUSES, STATUS_LABELS } from '../constants.js';

const FILTERS = [['', 'All'], ...STATUSES.map((status) => [status, STATUS_LABELS[status]])];

export default function StatusFilter({ value, onChange }) {
  return (
    <div className="filter" role="tablist" aria-label="Filter tasks by status">
      {FILTERS.map(([status, label]) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={value === status}
          className={value === status ? 'filter-tab active' : 'filter-tab'}
          onClick={() => onChange(status)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
