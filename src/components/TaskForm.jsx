// Form to create a new task, or edit an existing one (when `task` is given).
import { useState } from 'react';
import { STATUSES, STATUS_LABELS } from '../constants.js';

const EMPTY = { title: '', description: '', status: 'todo', due_date: '' };

function toFormValues(task) {
  if (!task) return EMPTY;
  return {
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    due_date: task.due_date ?? '',
  };
}

export default function TaskForm({ task, onSave, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(task));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isEditing = Boolean(task);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave({ ...values, due_date: values.due_date || null });
      if (!isEditing) setValues(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit task' : 'New task'}</h2>

      <label>
        Title
        <input name="title" value={values.title} onChange={handleChange} maxLength={255} required placeholder="What needs to be done?" />
      </label>

      <label>
        Description
        <textarea name="description" value={values.description} onChange={handleChange} rows={3} placeholder="Optional details" />
      </label>

      <div className="form-row">
        <label>
          Status
          <select name="status" value={values.status} onChange={handleChange}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Due date
          <input type="date" name="due_date" value={values.due_date} onChange={handleChange} />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Add task'}
        </button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
