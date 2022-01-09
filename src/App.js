import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dragable = ({ task, onRemove }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { task },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: ({ task }, monitor) => {
      console.log(`result`, { task }, monitor.didDrop());
      if (monitor.didDrop()) {
        onRemove(task);
      }
    },
  });
  return (
    <div className="flex mb-4 items-center" ref={dragRef}>
      <p className="w-full text-grey-darkest">{task}</p>
    </div>
  );
};
const DropAble = ({ tasks, setTasks, title }) => {
  // const [basket, setBasket] = useState(initialValue || []);
  const [{ isOver }, dropRef] = useDrop({
    accept: "pet",
    drop: (item) => {
      console.log(`item`, item);

      setTasks((prev) =>
        !prev.includes(item.task) ? [...prev, item.task] : prev
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      <div ref={dropRef}>
        <p className="mb-0">{title}</p>
      </div>
      {isOver && "Drop over here"}
      {tasks.map((task) => (
        <Dragable
          onRemove={() => {
            setTasks((prev) => prev?.filter((d) => d !== task));
          }}
          key={task}
          task={task}
        />
      ))}
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [newtask, setNewtask] = useState("");
  return (
    <div className="">
      <DndProvider backend={HTML5Backend}>
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className=" w-full lg:w-3/4 lg:max-w-lg">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <div className="mb-4">
                <h1 className="text-grey-darkest">Todo List</h1>
                <div className="flex mt-4">
                  <input
                    className="shadow  appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                    placeholder="Add Todo"
                    onChange={(e) => {
                      setNewtask(e.target.value);
                    }}
                    value={newtask}
                  />
                  <button
                    style={{ backgroundColor: "#5cb694", color: "white" }}
                    onClick={() => {
                      setTasks((prev) => [...prev, newtask]);
                      setNewtask("");
                    }}
                    className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
                  >
                    Add
                  </button>
                </div>
              </div>{" "}
            </div>

            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <DropAble title="Tasks" tasks={tasks} setTasks={setTasks} />
            </div>
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <DropAble
                title="Done tasks"
                tasks={doneTasks}
                setTasks={setDoneTasks}
              />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
