import { Draggable } from "@hello-pangea/dnd";
import { Edit, Trash2 } from "lucide-react";

export default function Card({ card, index, onUpdate, onDelete }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="
          bg-white 
          p-3 md:p-4 
          rounded-2xl 
          shadow-md hover:shadow-xl 
          cursor-pointer 
          transition-all duration-200 
          relative
        "
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-sm md:text-base">{card.name}</p>

          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={onUpdate}>
              <Edit size={18} className="text-blue-500 hover:text-blue-700" />
            </button>

            <button onClick={onDelete}>
              <Trash2 size={18} className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
