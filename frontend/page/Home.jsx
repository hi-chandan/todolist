import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Todolist from "../componet/Todolist";
import { useNavigate } from "react-router-dom";
import { Context } from "../src/main";

function Home() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [tasks, settasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setloading] = useState(false);

  const { isAuthentication } = useContext(Context);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const submittask = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        "api/v1/add",
        { title, description },
        { axiosConfig }
      );
      toast.success(data.message);
      setloading(false);
      settitle("");
      setdescription("");

      setRefresh((prev) => !prev);
    } catch (error) {
      toast.success(error.response.data.message);
      setloading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deletehandler = async (id) => {
    try {
      setloading(true);
      const { data } = await axios.delete(`/api/v1/task/${id}`, {
        withCredentials: true,
      });

      setloading(false);
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  useEffect(() => {
    if (!isAuthentication) return navigate("/login");
    axios
      .get("/api/v1/tasks", {
        withCredentials: true,
      })
      .then((res) => settasks(res.data.tasks))
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  return (
    <div className="bg-rose-200 h-full ">
      <div className="  flex justify-center  ">
        <form
          action=""
          onSubmit={submittask}
          className=" flex p-5  justify-center flex-col items-center m-3 space-y-8 bg-white sm:w-3/6 w-full h-2/6  "
        >
          <input
            className="p-2  w-full  border-2 outline-none text-lg"
            type="text"
            placeholder="task"
            name="task"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />

          <input
            className="p-2  w-full  border-2 outline-none text-lg"
            type="text"
            placeholder="Decription"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-600 p-3 w-4/6 text-white"
          >
            Add Task
          </button>
        </form>
      </div>
      <div className="flex flex-col  p-4  justify-center items-center space-y-3 bg-rose-200 ">
        {tasks.map((i) => (
          <Todolist
            key={i._id}
            title={i.title}
            description={i.description}
            iscomplete={i.iscomplete}
            updateHandler={updateHandler}
            deletehandler={deletehandler}
            id={i._id}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
