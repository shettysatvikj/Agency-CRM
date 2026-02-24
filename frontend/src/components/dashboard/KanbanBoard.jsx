import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'];

const statusStyles = {
  New: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  Contacted: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700',
  Qualified: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
  Closed: 'from-green-50 to-green-100 border-green-200 text-green-700',
  Lost: 'from-red-50 to-red-100 border-red-200 text-red-700',
};

const KanbanBoard = ({ leads, onStatusChange }) => {
  const columns = STATUSES.map((status) => ({
    status,
    items: leads.filter((l) => l.status === status),
  }));

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId;
    onStatusChange(draggableId, newStatus);
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Scroll Container */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 mt-6 w-full scroll-smooth">
          
          {columns.map((col) => (
            <Droppable droppableId={col.status} key={col.status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    flex-shrink-0
                    w-[85vw] sm:w-[320px] lg:w-[340px]
                    max-w-[340px]
                    min-h-[400px]
                    bg-gradient-to-br ${statusStyles[col.status]}
                    rounded-2xl border
                    p-4 sm:p-5
                    shadow-md
                    transition-all duration-300
                  `}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                      {col.status}
                    </h3>

                    <span className="text-xs bg-white/70 px-2 py-1 rounded-full shadow-sm">
                      {col.items.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {col.items.map((lead, index) => (
                      <Draggable
                        key={lead._id}
                        draggableId={lead._id}
                        index={index}
                      >
                        {(dragProvided, snapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`
                              rounded-xl bg-white
                              p-3 sm:p-4
                              shadow-sm border border-gray-100
                              text-xs sm:text-sm
                              transition-all duration-200
                              hover:shadow-md
                              ${snapshot.isDragging ? 'ring-2 ring-indigo-400 scale-[1.02]' : ''}
                            `}
                          >
                            <div className="font-semibold text-gray-800 truncate">
                              {lead.name}
                            </div>

                            <div className="text-gray-500 text-[11px] sm:text-xs mt-1 truncate">
                              {lead.email || lead.phone}
                            </div>

                            {lead.budget ? (
                              <div className="text-[11px] sm:text-xs text-gray-600 mt-2 font-medium">
                                💰 ₹
                                {Number(lead.budget).toLocaleString('en-IN')}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    {col.items.length === 0 && (
                      <div className="text-xs text-gray-500 text-center py-6 italic opacity-70">
                        Drag leads here 👇
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;