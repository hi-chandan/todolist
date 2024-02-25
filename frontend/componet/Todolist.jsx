import React from "react";

const Todolist = ({
  title,
  description,
  id,
  deletehandler,
  iscomplete,
  updateHandler,
  loading,
}) => {
  return (
    <div className=" flex justify-between items-center p-4 sm:w-3/6 w-full bg-light-2">
      <div className="">
        <h1 className="font-bold text-[20px]">{title}</h1>
        <p className="font-normal text-light-4 text-[18px]">{description}</p>
      </div>
      <div className="space-x-2 w-3/12 flex justify-center  items-center">
        <input
          className="size-8  accent-gray-600"
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={iscomplete}
        />
        <button
          onClick={() => deletehandler(id)}
          disabled={loading}
          className=" bg-gray-700 p-2  sm:w-32"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todolist;
