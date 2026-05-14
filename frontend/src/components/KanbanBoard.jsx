import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";


const columns = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "in-progress",
    title: "In Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];


function KanbanBoard({
  tasks,
  onStatusChange,
}) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    onStatusChange(taskId, newStatus);
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {columns.map((column) => {
          const filteredTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <Droppable
              droppableId={column.id}
              key={column.id}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-2xl p-4 min-h-[500px]"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    {column.title}
                  </h2>

                  <div className="space-y-4">
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-5 rounded-xl shadow"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-bold text-lg">
                                {task.title}
                              </h3>

                              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                {task.priority}
                              </span>
                            </div>

                            <p className="text-gray-600 text-sm">
                              {task.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;