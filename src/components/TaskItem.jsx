// One task in the list, with quick status change, edit and delete.
import { STATUSES, STATUS_LABELS } from '../constants.js';

function todayString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function formatDate(dateString) {
  // "2026-12-01" -> "1 Dec 2026" (parsed as local time so it doesn't shift a day)
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function TaskItem({ task, onStatusChange, onEdit, onDelete }) {
  const isOverdue = task.due_date && task.status !== 'done' && task.due_date < todayString();

  return (
    <li className={`card task-item status-${task.status}`}>
      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        {task.due_date && (
          <p className={isOverdue ? 'task-due overdue' : 'task-due'}>
            Due {formatDate(task.due_date)}
            {isOverdue && ' · overdue'}
          </p>
        )}
      </div>

      <div className="task-actions">
        <select
          aria-label="Change status"
          className={`status-select status-${task.status}`}
          value={task.status}
          onChange={(event) => onStatusChange(task, event.target.value)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-small" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </li>
  );
}
