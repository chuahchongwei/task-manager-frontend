import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, loading, onStatusChange, onEdit, onDelete }) {
  if (loading) return <p className="empty">Loading tasks…</p>;
  if (tasks.length === 0) return <p className="empty">No tasks here yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
